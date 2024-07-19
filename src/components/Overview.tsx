import { Tree, getBackendOptions, MultiBackend, NodeModel } from '@minoru/react-dnd-treeview'
import { DndProvider } from 'react-dnd'
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { useTree } from '../context/Tree';
import { RootBtn, AddFolderButton } from './AddBtn';
;
import { useEffect, useRef, useState } from 'react';
import { RenameModal, RootFolderModal, SubFolderModal } from './Modal';


const Overview = () => {
    const { treeData, dragUpdate } = useTree()

    const rootFolderModalRef = useRef<HTMLDialogElement>(null);
    const subFolderModalRef = useRef<HTMLDialogElement>(null);
    const renameModalRef = useRef<HTMLDialogElement>(null);
    const clickTimeout = useRef<number | null>(null);
    const [parentId, setParentId] = useState<number>(0);
    const [lastFolder, setLastFolder] = useState<NodeModel>({ id: 0, parent: 0, text: 'test' });



    function createRoot() {
        if (rootFolderModalRef.current) {
            rootFolderModalRef.current.showModal()
        }
    }
    function createFolder(id: number) {
        if (subFolderModalRef.current) {
            subFolderModalRef.current.showModal()
            setParentId(id);
        }
    }


    function handleClick(folder: NodeModel, onToggle: () => void) {
        if (clickTimeout.current) {
            window.clearTimeout(clickTimeout.current);
            clickTimeout.current = null;
            setLastFolder(folder);
            if (renameModalRef.current) {
                renameModalRef.current.showModal()
            }
        } else {
            clickTimeout.current = window.setTimeout(() => {
                onToggle()
                clickTimeout.current = null;
            }, 250);
        }

    }



    return (
        <>
            <section className='2xl:px-44 xl:px-36 lg:px-16 md:px-10 p-4 bg-gradient-to-tl from-blue-300 to-indigo-300 h-screen flex justify-center items-center'>
                <div className='m-4 p-4 rounded-xl bg-white w-full'>
                    <RootBtn onTap={() => createRoot()} />
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
                        <Tree
                            tree={treeData}
                            rootId={0}
                            onDrop={dragUpdate}
                            initialOpen={true}
                            enableAnimateExpand={true}
                            render={(node, { depth, isOpen, onToggle }) => {
                                return (
                                    <>
                                        <button onClick={() => handleClick(node, onToggle)} className='flex justify-start items-center cursor-pointer text-lg bg-slate-200 w-fit rounded-md px-4 py-2' style={{ marginLeft: depth * 20, marginTop: depth * 4, marginBottom: depth * 4 }}>
                                            {node.droppable && (
                                                <div className='mr-1'>{isOpen ? <FaFolderOpen className='text-indigo-500 text-2xl' /> : <FaFolder className='text-indigo-500 text-2xl' />}</div>
                                            )}
                                            {node.data != null && (<div className='mr-1'>
                                                <FaRegImage className='text-blue-500 text-2xl' />
                                            </div>)}
                                            {node.text}
                                        </button>
                                        {node.droppable && <div style={{ marginLeft: depth * 30, marginTop: depth * 4 }}>
                                            <AddFolderButton onTap={() => createFolder(Number(node.id))} />
                                        </div>}
                                    </>
                                )
                            }}
                        />
                    </DndProvider>
                </div>
            </section>
            <RootFolderModal modalRef={rootFolderModalRef} />
            <SubFolderModal modalRef={subFolderModalRef} parentId={parentId} />
            <RenameModal modalRef={renameModalRef} details={lastFolder} />
        </>
    )
}

export default Overview