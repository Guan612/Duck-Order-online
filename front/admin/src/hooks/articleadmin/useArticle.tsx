import { useEffect, useState } from "react";
import { getArticleListAPI,getArticleAPI, addArticleAPI } from "../../api/article";
import { message } from "antd";
import article from "../../dto/article";

export default function useArticle() {
    const [articleList, setArticleList] = useState([]);
    const [article,setArticle] = useState({})
    const [addArticleFlag,setAddArticleFlag] = useState(false);
    const [editArticleFlag,setEditArticleFlag] = useState(false);

    const getArticleList = async () =>{
        const res = await getArticleListAPI();
        setArticleList(res)
    }

    const ChageAddArticleFlag = () =>{
        setAddArticleFlag(!addArticleFlag)
    }

    const ChageEditArticleFlag = async () =>{
        setEditArticleFlag(!editArticleFlag)
    }

    const getArticle = async (id:number) =>{
        const res = await getArticleAPI(id);
        setArticle(res)
    }

    const AddArticle = async(data:article)=>{
        const res = await addArticleAPI(data);
        if(res){
            getArticleList();
            message.success("添加成功");
            setAddArticleFlag(!addArticleFlag)
        }
    }

    useEffect(() => {
        getArticleList();
    }, [])
    
    return {
        ChageEditArticleFlag,
        ChageAddArticleFlag,
        getArticle,
        AddArticle,
        articleList,
        article,
        editArticleFlag,
        addArticleFlag,
    }
}