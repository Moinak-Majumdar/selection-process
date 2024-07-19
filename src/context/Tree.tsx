import { DropOptions, NodeModel } from "@minoru/react-dnd-treeview";
import { Context, ReactNode, createContext, useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

type treeType = {
    createRoot: (itemData: NodeModel) => boolean,
    createSubFolder: (itemData: NodeModel) => boolean,
    renameFolder: (folderId: number, newName: string) => boolean,
    getLastItemId: () => number,
    treeData: NodeModel[],
    dragUpdate: (tree: NodeModel[], options: DropOptions) => void
};

let TreeContext: Context<treeType>

const Tree = ({ children }: { children: ReactNode }) => {
    const [TreeData, setTreeData] = useState<NodeModel[]>([]);

    function getLastItemId(): number {
        return TreeData.length == 0 ? 0 : TreeData[TreeData.length - 1].id as number;
    }

    function createRoot(folderData: NodeModel) {

        try {
            if (TreeData.length == 0) {
                setTreeData([folderData])
            } else {
                setTreeData([...TreeData, folderData]);
            }
            toast(`Root Node : ${folderData.text} is created.`)
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    function createSubFolder(itemData: NodeModel) {
        try {

            setTreeData([...TreeData, itemData]);
            if(itemData.data != null) {
                toast('File added.')
            } else {
                toast('Folder created.')
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    function renameFolder(itemId: number, newName: string) {
        try {
            const updatedTree = TreeData.map(folder => folder.id == itemId ? { ...folder, 'text': newName } : folder);
            setTreeData(updatedTree);
            toast('Rename successful.')
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }


    function dragUpdate(tree: NodeModel[], options: DropOptions) {
        setTreeData(tree);
    }

    const value: treeType = {
        createRoot,
        createSubFolder,
        renameFolder,
        getLastItemId,
        treeData: TreeData,
        dragUpdate,
    }

    TreeContext = createContext(value);

    return (
        <>
            <TreeContext.Provider value={value}>
                {children}
            </TreeContext.Provider>
            <ToastContainer newestOnTop={true} theme="light" pauseOnHover={true} />
        </>
    )
}

export function useTree() {
    return useContext(TreeContext);
}

export default Tree
