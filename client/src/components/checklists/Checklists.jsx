import { addChecklist, deleteChecklist, getAllChecklists } from "../../services/checklistService";
import Checklist from "./Checklist";
import { useContext, useEffect, useState } from "react";
import NoAccess from "../error/NoAccess";
import NoContent from "../error/NoContent";
import EmptyChecklist from "./EmptyChecklist";
import NavContext from "../../contexts/navContext";
import AuthContext from "../../contexts/authContext";

export default function Checklists() {

    const { handleNavigationClick } = useContext(NavContext);
    const { user } = useContext(AuthContext);

    const [checklists, setChecklists] = useState([]);
    const [activeChecklistId, setActiveChecklistId] = useState('');
    const [makeNew, setMakeNew] = useState(false);

    const [text, setText] = useState('');

    async function addTask(title) {
        if (text) {
            const newTask = {
                title: title,
                status: "Not started",
                events: {}
            };

            await addChecklist(user._id, newTask);
            setChecklists([...checklists, newTask]);
            setText('');
        }
    }

    const deleteChecklistHandler = async (id) => {
        await deleteChecklist(user._id, id);

        setChecklists(checklists.filter(checklist => checklist._id !== id));
    }

    useEffect(() => {
        if (user._id) {
            getAllChecklists(user._id)
                .then(setChecklists);
        }

        console.log(checklists.length)
    }, [user]);

    return (
        <div className="content checklists">
            {!user._id
                ? <NoAccess onItemClick={handleNavigationClick} />
                : checklists.length > 0
                    ? <ul className="checklists-list">
                        {checklists.map(item =>
                            <Checklist key={item._id} checklist={item}
                                activeChecklistId={activeChecklistId} setActiveChecklistId={setActiveChecklistId}
                                deleteChecklist={deleteChecklistHandler} />
                        )}
                        <EmptyChecklist setChecklists={setChecklists}></EmptyChecklist>
                    </ul>
                    : <div className="no-items">

                        <NoContent />

                        {!makeNew
                            ? <button className="add-checklist" onClick={() => setMakeNew(true)}>Add</button>
                            : <div className="new-note">
                                <input value={text} placeholder="Checkbox title" onChange={e => setText(e.target.value)} />
                                <button className="add-checklist" onClick={() => addTask(text)}>Add</button>
                            </div>
                        }
                    </div>
            }
        </div>
    )
}