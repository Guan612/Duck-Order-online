import { Button, Select, Modal, Form, Input, Upload } from "antd";
import useArticle from "../../hooks/articleadmin/useArticle";

export default function ArticleAdmin() {
  const {
    article,
    articleList,
    addArticleFlag,
    editArticleFlag,
    addForm,
    editForm,
    fileTypeOptions,
    chageEditArticleFlag,
    chageAddArticleFlag,
    getArticle,
    addArticle,
    editArticle,
    deleteArticle,
    beforeUpload,
    handleUpload,
  } = useArticle();
  
  return (
    <div className="flex flex-col">
      <Modal
        title="新增文章"
        closable={{ "aria-label": "Custom Close Button" }}
        open={addArticleFlag}
        onCancel={chageAddArticleFlag}
        onOk={addArticle}
      >
        <div className="flex flex-col">
          <Form form={addForm} layout="vertical">
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: "请输入标题!" }]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="概述"
              name="content"
              rules={[{ required: true, message: "请输入概述!" }]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item label="类型" name="articledType">
              <Select placeholder="请选择类型" options={fileTypeOptions} />
            </Form.Item>
            <Form.Item label="内容" name="articledUrl">
              <Upload
                beforeUpload={beforeUpload}
                customRequest={(options) => handleUpload(options, addForm)}
                showUploadList={true}
                maxCount={1}
              >
                <Button>上传pdf/mp4视频</Button>
              </Upload>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Modal
        title="修改文章"
        closable={{ "aria-label": "Custom Close Button" }}
        open={editArticleFlag}
        onCancel={chageEditArticleFlag}
        onOk={editArticle}
      >
        <div className="flex flex-col">
          <Form form={editForm} layout="vertical">
            <Form.Item label="标题" name="title">
              <Input type="text" placeholder={article.title} />
            </Form.Item>
            <Form.Item label="概述" name="content">
              <Input type="text" placeholder={article.content} />
            </Form.Item>
            <Form.Item label="类型" name="articledType">
              <Select placeholder="请选择类型" options={fileTypeOptions} />
            </Form.Item>
            <Form.Item label="内容" name="articledUrl">
              <Upload
                beforeUpload={beforeUpload}
                customRequest={(options) => handleUpload(options, editForm)}
                showUploadList={true}
                maxCount={1}
              >
                <Button>上传pdf/mp4视频</Button>
              </Upload>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <h1 className="text-2xl font-bold mb-4 text-center">文章管理</h1>
      <div className="flex flex-row justify-between p-2">
        <Button type="primary" onClick={chageAddArticleFlag}>
          新增文章
        </Button>
      </div>
      <div className="flex flex-col p-2">
        <div className="flex flex-row justify-around p-2 m-2 font-bold text-xl">
          <div>标题</div>
          <div>概述</div>
          <div>操作</div>
        </div>
        {articleList.length > 0 ? (
          articleList.map((item) => {
            return (
              <div
                className="flex flex-row justify-around p-2 m-2"
                key={item.id}
              >
                <div>{item.title}</div>
                <div>{item.content}</div>
                <div>
                  <Button
                    type="primary"
                    className="mx-1"
                    onClick={() => {
                      chageEditArticleFlag();
                      getArticle(item.id);
                    }}
                  >
                    修改文章
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      deleteArticle(item.id);
                    }}
                  >
                    删除文章
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center font-bold text-4xl">
            暂无数据，请新增文章
          </div>
        )}
      </div>
    </div>
  );
}