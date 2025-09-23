import { useEffect, useState } from "react";
import { Form, message } from "antd";
import type { FormInstance } from "antd";
import {
  getArticleListAPI,
  getArticleAPI,
  addArticleAPI,
  editArticleAPI,
  deleteArticleAPI,
} from "../../api/article";
import article from "../../dto/article";
import { uploadDocAPI, uploadVideoAPI } from "../../api/upload";

export default function useArticle() {
  // 2. 在 Hook 内部创建 Form 实例
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [form] = Form.useForm();
  const [updateform] = Form.useForm();

  const [articleList, setArticleList] = useState<article[]>([]);
  const [article, setArticle] = useState<article>({
    title: "",
    content: "",
    articledUrl: "",
    articledType: 0,
  });
  const [addArticleFlag, setAddArticleFlag] = useState(false);
  const [editArticleFlag, setEditArticleFlag] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const getArticleList = async () => {
    const res = await getArticleListAPI();
    setArticleList(res);
  };

  const chageAddArticleFlag = () => {
    // 关闭时清空新增表单，避免数据残留
    if (addArticleFlag) {
      addForm.resetFields();
    }
    setAddArticleFlag(!addArticleFlag);
  };

  const chageEditArticleFlag = () => {
    setEditArticleFlag(!editArticleFlag);
  };

  const getArticle = async (id: number) => {
    const res = await getArticleAPI(id);
    setArticle(res);
  };

  // 3. 重构 addArticle 函数
  const addArticle = async () => {
    try {
      // 首先验证表单
      const values = await addForm.validateFields();

      // 添加调试日志
      console.log("提交的表单数据:", values);

      // 发起 API 请求
      const res = await addArticleAPI(values);
      if (res) {
        getArticleList(); // 成功后刷新列表
        message.success("添加成功");
        setAddArticleFlag(false); // 关闭 Modal
        addForm.resetFields(); // 清空表单
      }
    } catch (error) {
      console.log("表单验证失败或API出错:", error);
      message.error("添加失败，请检查表单内容！");
    }
  };

  // 3. 重构 editArticle 函数
  const editArticle = async () => {
    try {
      const values = await editForm.validateFields();
      // 注意：API 需要文章的 id，我们从 state 中的 article 获取
      const res = await editArticleAPI(article.id, values);
      if (res) {
        getArticleList();
        message.success("修改成功");
        setEditArticleFlag(false); // 关闭 Modal
      }
    } catch (error) {
      console.log("表单验证失败或API出错:", error);
      message.error("修改失败，请检查表单内容！");
    }
  };

  const deleteArticle = async (id: number) => {
    const res = await deleteArticleAPI(id);
    if (res) {
      getArticleList();
      message.success("删除成功");
    }
  };

  // 2. 修正 beforeUpload 的文件类型判断
  const beforeUpload = (file: File) => {
    // MIME 类型修正
    const isFlieType =
      file.type === "application/pdf" || file.type === "video/mp4";
    if (!isFlieType) {
      message.error("只能上传 pdf/mp4 文件!");
      return false;
    }
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isLt20M) {
      message.error("文件大小不能超过 20MB!");
      return false;
    }
    return true; // 阻止默认上传行为，使用自定义上传
  };

  // 3. 修改上传处理函数
  const handleUpload = async ({
    file,
    onSuccess,
    onError,
  }: {
    file: any;
    onSuccess?: Function;
    onError?: Function;
  }) => {
    try {
      const actualFile = file.originFileObj || file.file || file; // 获取文件对象
      console.log("文件类型:", actualFile.type, "文件名:", actualFile.name); // 输出文件类型和文件名

      let res: any;

      // 判断文件类型并选择正确的上传 API
      if (
        actualFile.type?.includes("pdf") ||
        actualFile.name?.toLowerCase().endsWith(".pdf")
      ) {
        res = await uploadDocAPI(actualFile); // 上传 PDF 文件
      } else if (
        actualFile.type?.includes("mp4") ||
        actualFile.name?.toLowerCase().endsWith(".mp4")
      ) {
        res = await uploadVideoAPI(actualFile); // 上传 MP4 文件
      } else {
        const err = new Error(
          `不支持的文件类型: ${actualFile.type || actualFile.name}`
        );
        console.error("文件类型错误:", err);
        onError?.(err); // 调用 onError 处理错误
        return;
      }

      // 如果文件上传成功
      if (res && res.url) {
        const fullUrl = res.url;
        console.log("上传成功，文件 URL:", fullUrl);

        // 将文件的 URL 设置到表单字段，确保是 URL 而非文件对象
        form.setFieldsValue({
          articledUrl: fullUrl, // 使用文件 URL
        });

        // 也更新其他表单字段
        updateform.setFieldsValue({
          articledUrl: fullUrl, // 使用文件 URL
        });

        message.success(`${file.name} 文件上传成功`);
        onSuccess?.("ok"); // 调用 onSuccess，表示上传成功
      } else {
        throw new Error("上传失败，无法获取文件URL。");
      }
    } catch (error) {
      console.error("上传出错:", error);
      message.error("上传失败!");
      onError?.(error); // 调用 onError 处理上传失败
    } finally {
      setLoading(false); // 上传完成后，关闭 loading 状态
    }
  };

  // 4. 将数据回显的 Effect 移入 Hook
  useEffect(() => {
    // 当 getArticle 获取到新数据且修改弹窗可见时，填充表单
    if (article && editArticleFlag) {
      editForm.setFieldsValue(article);
    }
  }, [article, editArticleFlag, editForm]);

  useEffect(() => {
    getArticleList();
  }, []);

  const fileTypeOptions = [
    {
      label: "pdf",
      value: 0,
    },
    {
      label: "mp4",
      value: 1,
    },
  ];

  return {
    articleList,
    article,
    addArticleFlag,
    editArticleFlag,
    addForm,
    editForm,
    fileTypeOptions,
    getArticle,
    chageAddArticleFlag,
    chageEditArticleFlag,
    addArticle,
    editArticle,
    deleteArticle,
    beforeUpload,
    handleUpload,
  };
}
