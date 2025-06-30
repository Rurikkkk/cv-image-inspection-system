import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef, useState } from 'react';
import data from './files.json'
export default function PhotoFilesystemView(props){
    const [error, setError] = useState(0);
    const [imagePath, setPath] = useState(0);
    const fileRef = useRef();
    const imageRef = useRef();
    const submitHandler = (e) => {
        e.preventDefault();
        if(e.target.file.value) {

            //запрос на ФС

            e.target.file.value = ''
        }
        else {
            setError('Файл не загружен')
            fileRef.current.focus();
        }
    }
    return(
        <div className="filesystem-field">
            <form onSubmit={submitHandler}>
                <div className='UI-container'>
                    <div className="mb-3">
                        <div style={{marginBottom: '10px', marginTop: '10px'}}>
                            <input className="form-control" type="file" accept='image/*' id="formFile" name='file' ref={fileRef}></input>
                        </div>
                        <div style={{opacity: error === 0 ? 0 : 1, height: error === 0 ? 0 : 'auto', overflow: 'hidden' }}>
                            <div className="alert alert-danger d-flex align-items-center" role="alert" style={{marginBottom: 0}}>
                                <svg width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </svg>
                                <div>
                                    {error === 0 ? '' : error}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='UI-row'>
                        <input className='photo-load-submit btn btn-secondary' type="submit" style={{width: '100%', marginBottom: '10px'}}></input>
                    </div>
                </div>
            </form>
            <table className='table table-dark table-striped'>
                <tbody>
                    {data["files"].map((file) => (
                        <tr key={file}>
                            <td>
                                {file}
                            </td>
                            <td>
                                <button className='btn btn-secondary' onClick={()=>{setPath(file); imageRef.current.focus()}}>Просмотр</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <img style={{opacity: imagePath === 0 ? 0 : 1}} src={'./' + imagePath} ref={imageRef} alt={'./' + imagePath}></img>
        </div>
    )
}