
import React, {useState, useEffect} from 'react'



function MFA() {

    const [mfaField, setMfaField] = useState("");

    const sendChallenge = (event) => {
        
    }
    
    const updateMfaField = (event) => {
        setMfaField("t");
        console.log(event);
    }

    return (
        <div>
            <label>Enter MFA Key:
                <input type='text' value={mfaField} onChange={(e) => updateMfaField(e)}/>
            </label>
            <Button onClick={(e) => sendChallenge(e)}>
                Submit
            </Button>
        </div>
    )

}

export default MFA;