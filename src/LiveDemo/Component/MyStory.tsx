import { useSelector } from 'react-redux';
import styles from '../LivePageCss/myStory.module.scss';
import { RootState } from '../../Store/appstore';
import { useEffect, useState } from 'react';

export const MyStory = () => {

    const [inputValue, setInputVal] = useState<string>("");
    const [editorInput, setEditorInput] = useState<string>("");

    const textColor = useSelector((store: RootState) => store.text.isText);
    const pageColor = useSelector((store: RootState) => store.color.isColor);
    const editorSwitch = useSelector((store: RootState) => store.editor.isSwitch);

    useEffect(() => {
        setInputVal(localStorage.getItem('editor-input') || '');
        const storedEditorInput = localStorage.getItem('ckEditorVal') || '';
        setEditorInput(storedEditorInput);

        const message = document.getElementById('message');
        if (message) {
            message.innerHTML = storedEditorInput;
        }
    }, []);

    return (
        <>
        {editorSwitch && <div className={styles['story']}>
                <div className={styles['story-heading']} style={{color: textColor}}>
                    <h2>{inputValue}</h2>
                    <div className={styles['story-heading-line']} style={{backgroundColor: pageColor}}></div>
                </div>
                <div className={styles['story-description']} id='message' style={{color: textColor}}></div>
            </div>}
        </>
    );
}