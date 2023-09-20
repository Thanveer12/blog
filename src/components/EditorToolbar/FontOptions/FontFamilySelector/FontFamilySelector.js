import React, { useState } from 'react';
import './FontFamilySelector.scss'
import SpeedSelect from 'react-speedselect/dist/SpeedSelect';

const fontStyles = [
    { id: 'arial', label: 'Arial' },
    { id: 'timesNewRoman', label: 'Times New Roman' },
    { id: 'verdana', label: 'Verdana' },
    { id: 'tahoma', label: 'Tahoma' },
    { id: 'helvetica', label: 'Helvetica' },
    { id: 'georgia', label: 'Georgia' },
    { id: 'courierNew', label: 'Courier New' },
    { id: 'palatinoLinotype', label: 'Palatino Linotype' },
    { id: 'lucidaSansUnicode', label: 'Lucida Sans Unicode' },
    { id: 'lucidaConsole', label: 'Lucida Console' },
    { id: 'trebuchetMS', label: 'Trebuchet MS' },
    { id: 'impact', label: 'Impact' },
    { id: 'bookAntiqua', label: 'Book Antiqua' },
    { id: 'arialBlack', label: 'Arial Black' },
    { id: 'garamond', label: 'Garamond' },
    { id: 'comicSansMS', label: 'Comic Sans MS' },
    { id: 'centuryGothic', label: 'Century Gothic' },
    { id: 'franklinGothicMedium', label: 'Franklin Gothic Medium' },
    { id: 'centurySchoolbook', label: 'Century Schoolbook' },
    { id: 'copperplate', label: 'Copperplate' },
    { id: 'baskerville', label: 'Baskerville' },
    { id: 'brushScriptMT', label: 'Brush Script MT' },
    { id: 'futura', label: 'Futura' },
    { id: 'consolas', label: 'Consolas' },
    { id: 'arialNarrow', label: 'Arial Narrow' },
    { id: 'didot', label: 'Didot' },
    { id: 'monaco', label: 'Monaco' },
    { id: 'candara', label: 'Candara' },
    { id: 'rockwell', label: 'Rockwell' },
    { id: 'segoeUI', label: 'Segoe UI' },
    { id: 'geneva', label: 'Geneva' },
    { id: 'optima', label: 'Optima' },
    { id: 'papyrus', label: 'Papyrus' },
    { id: 'verdanaPro', label: 'Verdana Pro' },

];

const FontFamilySelector = () => {

    const [currentFont,setCurrentFont]=useState(fontStyles[0]);

    const onFontSelect=(e)=>{
        setCurrentFont(e)
    }
    return (

        <div className='fontfamilyselector-parent-wrapper'>
            <SpeedSelect
                options={fontStyles}
                selectLabel={currentFont.label}
                displayKey='label'
                uniqueKey='id'
                maxHeight={150}
                onSelect={(e) => onFontSelect(e)}
                disableSearch={true}
            />
        
        </div>
        )
}

export default FontFamilySelector