import useGetMenu from "../../../hooks/menuAdmin/useGetMenu"
export default function MenuAdmin() {
    const {getMenuList,menuList} = useGetMenu()
    return(
        <div>
            <h1>Menu Admin</h1>
        </div>
    )
}