import {NextPage} from "next";
import CommandPalettes from "../components/commandPalettes";

const Home: NextPage = () => {
    return (
        <>
            <CommandPalettes />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
               <p className={'text-white'}>hello world</p>
            </div>
        </>
    );
}
export default Home