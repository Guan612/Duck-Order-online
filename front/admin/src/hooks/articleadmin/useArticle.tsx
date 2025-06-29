import { useEffect, useState } from "react";
import { Form, message } from "antd";
import { getArticleListAPI, getArticleAPI, addArticleAPI, editArticleAPI, deleteArticleAPI } from "../../api/article";
import article from "../../dto/article";


export default function useArticle() {
    // 2. 在 Hook 内部创建 Form 实例
    const [addForm] = Form.useForm();
    const [editForm] = Form.useForm();

    const [articleList, setArticleList] = useState<article[]>([]);
    const [article, setArticle] = useState<article>({
        title: '',
        content: '',
        articledType: 0
    });
    const [addArticleFlag, setAddArticleFlag] = useState(false);
    const [editArticleFlag, setEditArticleFlag] = useState(false);

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
    }
    
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

    return {
        articleList,
        article,
        addArticleFlag,
        editArticleFlag,
        addForm,
        editForm,
        getArticle,
        chageAddArticleFlag,
        chageEditArticleFlag,
        addArticle,
        editArticle,
        deleteArticle,
    };
}