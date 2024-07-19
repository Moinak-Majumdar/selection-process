import { IoAdd } from 'react-icons/io5'

interface IProps {
    onTap: () => void,
}

const RootBtn = ({onTap}: IProps) => {
    return (
        <button onClick={() => onTap()} className="text-white bg-gradient-to-br from-green-300 to-blue-500 rounded-lg text-sm px-4 py-2 text-center inline-flex items-center transition ease-in-out duration-500 my-2">
            <IoAdd className='mr-2 text-xl' />
            Create Root
        </button>
    );
}

const AddFolderButton = ({onTap}: IProps) => {
    return (
        <button onClick={() => onTap()} className="text-white bg-gradient-to-br from-green-300 to-blue-500 rounded-lg text-xs p-2 text-center inline-flex items-center transition ease-in-out duration-500 my-1 mx-2">
            {/* <IoAdd className='mr-1' /> */}
            Add
        </button>
    )
}


export {RootBtn, AddFolderButton}


