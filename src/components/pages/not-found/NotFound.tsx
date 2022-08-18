import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { paths } from '../../../util/paths';
import { asset } from '../../../util/util';
import NavHeader from '../../content-pages/nav-header/NavHeader';
import Body from './NotFound.css'

const NotFound = () => {

    const history = useHistory();

    useEffect(() => {
        window.localStorage.clear();
    }, [])

    return (
        <Body>
            <div>
                <div className="nav">
                    <NavHeader page=""/>
                </div>
            </div>
            <main>
                <div className="div-404">
                    <span className="img-404-4" id="g1">
                        <img src={asset('icons', '404-4.svg')} alt="404" />
                    </span>
                    <span className="img-404-4">
                        <img src={asset('icons', '404-0.svg')} alt="404" id="g6219"  />
                    </span>
                    <span className="img-404-4" id="g2">
                        <img src={asset('icons', '404-4.svg')} alt="404" />
                    </span>
                </div>


                <p id="errorText">Page Not Found</p>
                <button id="errorLink" onClick={()=>history.push(paths.LANDING)}>Go Back</button>
            </main>
        </Body>

    )
}

export default NotFound;
