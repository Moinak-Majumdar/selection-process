import { FormEvent, RefObject, useEffect, useRef, useState } from 'react'
import { LuSend } from 'react-icons/lu'
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { useTree } from '../context/Tree';

import { NodeModel } from '@minoru/react-dnd-treeview';

interface props { modalRef: RefObject<HTMLDialogElement>, parentId?: number}

const RootFolderModal = (props: props) => {
    const { createRoot, getLastItemId } = useTree()

    const formRef = useRef<HTMLFormElement>(null)
    const [itemType, setItemType] = useState<string>('folder');


    function action(e: FormEvent) {
        e.preventDefault();
        try {
            if (formRef.current) {
                const data = new FormData(formRef.current)
                const itemName = data.get('name')!.toString();
                const lastId = getLastItemId();
                const itemData = itemType === 'folder' ? { 'id': lastId + 1, "parent": 0, "droppable": true, "text": itemName } : { 'id': lastId + 1, 'parent': 0, 'droppable': false, 'text': itemName, "data": { "fileType": "image", "fileSize": "2.1MB" } };
                createRoot(itemData);
            }
            props.modalRef.current?.close()
        } catch (error) {
            props.modalRef.current?.close();
        } finally {
            formRef.current?.reset();
        }
    }


    return (
        <>
            <dialog ref={props.modalRef} className="w-4/5 md:w-1/2 bg-white dark:bg-slate-800 rounded-md shadow-2xl dark:shadow-black fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 outline-none backdrop:bg-black/80 z-[100]">
                <div className='flex justify-end text-slate-500 dark:text-blue-300  p-4'>
                    <span onClick={() => props.modalRef.current?.close()} className='ring-1 rounded-md text-xs h-fit p-1 ring-slate-900/10 dark:ring-slate-700/50 shadow-sm ml-3 cursor-pointer'>
                        Esc
                    </span>
                </div>
                <div className='w-full flex p-4 justify-start items-center gap-4'>
                    <div className="flex items-center">
                        <input id="root-radio-1" type="radio" value='folder' checked={itemType === 'folder'} onChange={() => setItemType('folder')} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="root-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Add Folder</label>
                    </div>
                    <div className="flex items-center">
                        <input id="root-radio-2" type="radio" value='file' checked={itemType === 'file'} onChange={() => setItemType('file')} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="root-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Add File</label>
                    </div>
                </div>
                <form ref={formRef} onSubmit={action} className='w-full flex p-4 flex-col'>
                    <div className="w-full">
                        <label htmlFor="name" className="block mb-4 text-base font-medium text-gray-600 dark:text-gray-300">{itemType == 'file' ? 'Add File' : 'Add Folder'}</label>
                        <input type="text" id="name" name="name" required className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-indigo-900 dark:text-gray-100 disabled:cursor-none" placeholder={itemType == 'file' ? 'File Name' : 'Folder Name'} />
                    </div>
                    <button type="submit" className="mt-6 text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-500 rounded-lg text-lg flex items-center w-fit ml-auto gap-2 disabled:cursor-none">
                        <LuSend className="text-xl" /> Add
                    </button>
                </form>
            </dialog>
        </>
    )
}

const SubFolderModal = (props: props) => {
    const { createSubFolder, getLastItemId } = useTree()
    const [itemType, setItemType] = useState<string>('folder');

    const formRef = useRef<HTMLFormElement>(null)

    function action(e: FormEvent) {
        e.preventDefault();
        try {
            if (formRef.current) {
                const data = new FormData(formRef.current);
                const itemName = data.get('name')!.toString();
                const lastId = getLastItemId();
                const itemData: NodeModel = itemType === 'folder' ? { 'id': lastId + 1, "parent":props.parentId!, "droppable": true, "text": itemName } : { 'id': lastId + 1, 'parent': props.parentId!, 'droppable': false, 'text': itemName, "data": { "fileType": "image", "fileSize": "2.1MB" } };
                createSubFolder(itemData)
        
            }

            props.modalRef.current?.close()
        } catch (error) {
            props.modalRef.current?.close();
        } finally {
            formRef.current?.reset();
        }
    }


    return (
        <>
            <dialog ref={props.modalRef} className="w-4/5 md:w-1/2 bg-white dark:bg-slate-800 rounded-md shadow-2xl dark:shadow-black fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 outline-none backdrop:bg-black/80 z-[100]">
                <div className='flex justify-end text-slate-500 dark:text-blue-300  p-4'>
                    <span onClick={() => props.modalRef.current?.close()} className='ring-1 rounded-md text-xs h-fit p-1 ring-slate-900/10 dark:ring-slate-700/50 shadow-sm ml-3 cursor-pointer'>
                        Esc
                    </span>
                </div>
                <div className='w-full flex p-4 justify-start items-center gap-4'>
                    <div className="flex items-center">
                        <input id="sub-radio-1"  type="radio" value='folder' checked={itemType === 'folder'} onChange={(e) => setItemType(e.target.value)} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="sub-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Add Folder</label>
                    </div>
                    <div className="flex items-center">
                        <input id="sub-radio-2"  type="radio" value='file' checked={itemType === 'file'} onChange={(e) => setItemType(e.target.value)} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="sub-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Add File</label>
                    </div>
                </div>
                <form ref={formRef} onSubmit={action} className='w-full flex p-4 flex-col'>
                    <div className="w-full">
                        <label htmlFor="name" className="block mb-2 text-base font-medium text-gray-600 dark:text-gray-300">{itemType == 'folder'? 'Add Folder': 'Add File'}</label>
                        <input type="text" name="name" required className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-indigo-900 dark:text-gray-100 disabled:cursor-none" placeholder={itemType === 'file' ?'File Name' : 'Folder Name'} />
                    </div>

                    <button type="submit" className="mt-6 text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-500 rounded-lg text-lg flex items-center w-fit ml-auto gap-2 disabled:cursor-none">
                        <LuSend className="text-xl" /> Add
                    </button>
                </form>
            </dialog>
        </>
    )
}

interface renameProps { modalRef: RefObject<HTMLDialogElement>, details: NodeModel }

const RenameModal = (props: renameProps) => {

    const formRef = useRef<HTMLFormElement>(null)
    const [folder, setFolder] = useState<NodeModel>(props.details)
    const [folderName, setFolderName] = useState<string>('');
    const { renameFolder } = useTree();

    useEffect(() => {
        setFolder(props.details)
        setFolderName(props.details.text)
    }, [props.details])


    function action(e: FormEvent) {
        e.preventDefault();
        try {
            renameFolder(Number(folder.id), folderName)
            props.modalRef.current?.close()
        } catch (error) {
            props.modalRef.current?.close();
        } finally {
            formRef.current?.reset();
        }
    }

    return (
        <>
            <dialog ref={props.modalRef} className="w-4/5 md:w-1/2 bg-white dark:bg-slate-800 rounded-md shadow-2xl dark:shadow-black fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 outline-none backdrop:bg-black/80 z-[100]">
                <div className='flex justify-end text-slate-500 dark:text-blue-300  p-4'>
                    <span onClick={() => props.modalRef.current?.close()} className='ring-1 rounded-md text-xs h-fit p-1 ring-slate-900/10 dark:ring-slate-700/50 shadow-sm ml-3 cursor-pointer'>
                        Esc
                    </span>
                </div>
                <form ref={formRef} onSubmit={action} className='w-full flex p-4 flex-col'>
                    <div className="w-full">
                        <label htmlFor="name" className="block mb-2 text-base font-medium text-gray-600 dark:text-gray-300">Rename Folder</label>
                        <input value={folderName} onChange={(e) => setFolderName(e.target.value)} required className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-indigo-900 dark:text-gray-100 disabled:cursor-none" placeholder='Folder name' />
                    </div>

                    <button type="submit" className="mt-6 text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-500 rounded-lg text-lg flex items-center w-fit ml-auto gap-2 disabled:cursor-none">
                        <MdOutlineDriveFileRenameOutline className="text-xl" /> Rename
                    </button>
                </form>
            </dialog>
        </>
    )

}

export { RootFolderModal, SubFolderModal, RenameModal }