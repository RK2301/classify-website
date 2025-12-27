import { PuffLoader } from "react-spinners"


const loading = () => {

    return (
        <div
            className="h-screen w-screen flex items-center justify-center"
        >
            <PuffLoader color={'#3f72af'} />
        </div>
    )
}

export default loading