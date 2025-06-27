import { Button, Select, Modal, Form, Input, Upload } from "antd";
import useArticle from "../../hooks/articleadmin/useArticle";

export default function ArticleAdmin() {
  const {
    article,
    articleList,
    addArticleFlag,
    editArticleFlag,
    ChageEditArticleFlag,
    ChageAddArticleFlag,
    getArticle,
    AddArticle,
  } = useArticle();
  return (
    <div className="flex flex-col">
      <Modal
        title="新增文章"
        closable={{ "aria-label": "Custom Close Button" }}
        open={addArticleFlag}
        onCancel={ChageAddArticleFlag}
        onOk={AddArticle}
      >
        <div className="flex flex-col">
          <Form>
            <Form.Item label="标题" name="title">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="概述" name="content">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="内容" name="articledUrl">
              <Upload>
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
        onCancel={ChageEditArticleFlag}
        onOk={ChageEditArticleFlag}
      >
        <div className="flex flex-col">
          <Form>
            <Form.Item label="标题" name="title">
              <Input type="text" placeholder={article.title} />
            </Form.Item>
            <Form.Item label="概述" name="content">
              <Input type="text" placeholder={article.content} />
            </Form.Item>
            <Form.Item label="内容" name="articledUrl">
              <Upload>
                <Button>上传pdf/mp4视频</Button>
              </Upload>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <h1 className="text-2xl font-bold mb-4 text-center">文章管理</h1>
      <div className="flex flex-row justify-between p-2">
        <Button type="primary" onClick={ChageAddArticleFlag}>
          新增文章
        </Button>
      </div>
      <div className="flex flex-col p-2">
        <div className="flex flex-row justify-around p-2 m-2 font-bold text-xl">
          <div>标题</div>
          <div>内容</div>
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
                <Button
                  type="primary"
                  onClick={() => {
                    ChageEditArticleFlag();
                    getArticle(item.id);
                  }}
                >
                  修改文章
                </Button>
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
