import { useEffect, useRef, useState } from "react";
import extraData from './files.json';
import config from './config.json';
import NotifiedPhoto from "./NotifiedPhoto";

export default function NotifedPhotosView(props) {
  const isLoaded = useRef(false);
  const [data, setData] = useState([]);
  const [imagePath, setPath] = useState(0);
  const imageRef = useRef();

  useEffect(() => {
    if (isLoaded.current) return;
    isLoaded.current = true;
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/images', { method: "GET" });
        if (!response.ok) {
          setData(extraData);
          throw new Error('Ошибка загрузки');
        } else {
          setData(await response.json());
        }
      } catch {
        setData(extraData);
        console.log('Сервер недоступен, загружены данные-заглушка');
      }
    };
    fetchData();
  }, []);

  const pureData = data.filter((x) => x.alerts[0]);
  console.log(pureData);

  return (
    <div className="alerts-field">
      <h1>Фото с меткой "Предупреждение"</h1>
      <table
        className={`table ${props.isDarkMode ? 'table-dark' : ''} table-striped`}
      >
        <tbody>
          {pureData.map((file) => (
            <NotifiedPhoto
              key={file.source}
              checked={false}
              file={file}
              clickHandler={() => {
                setPath(file.markuped);
                imageRef.current.focus();
              }}
            />
          ))}
        </tbody>
      </table>
      <img
        style={{ opacity: imagePath === 0 ? 0 : 1 }}
        src={config["filepathPrefix"] + imagePath}
        ref={imageRef}
        alt={config["filepathPrefix"] + imagePath}
      ></img>
    </div>
  );
}