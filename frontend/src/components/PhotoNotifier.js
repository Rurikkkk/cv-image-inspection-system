import { useEffect, useRef, useState } from "react";
import extraData from './files.json'
import NotifiedPhoto from "./NotifiedPhoto";
export default function NotifedPhotosView(props){
    const isLoaded = useRef(false);
    const [data, setData] = useState([]);
    const [imagePath, setPath] = useState(0);
    const imageRef = useRef();
    useEffect(() => {
        if (isLoaded.current) return;
        isLoaded.current = true;

        const fetchData = async () => {
            try{
                const response = await fetch('http://localhost:5001/images', {method: "GET"});
                if (!response.ok){
                    setData(extraData);
                    console.log(extraData);
                    throw new Error ('Ошибка загрузки');
                }
                else{
                    setData(await response.json())
                }
            }
            catch{
                setData(extraData);
                console.log('Сервер недоступен, загружены данные-заглушка');
            }
        }
        fetchData();
    },[]);
    return(
        <div className="alerts-field">
            <h1>Фото с меткой "Предупреждение"</h1>
            <table className='table table-dark table-striped'>
                <tbody>
                    {data.map((file) => (
                        <NotifiedPhoto checked={false} setChecked={()=>{}} file={file} clickHandler={()=>{setPath(file.markuped); imageRef.current.focus()}}></NotifiedPhoto>
                    ))}
                </tbody>
            </table>
            <img style={{opacity: imagePath === 0 ? 0 : 1}} src={'./' + imagePath} ref={imageRef} alt={'./' + imagePath}></img>
        </div>
    )
}