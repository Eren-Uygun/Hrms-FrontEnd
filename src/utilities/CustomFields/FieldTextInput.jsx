import { useField } from 'formik'
import React from 'react'
import { FormField, Input } from 'semantic-ui-react'

export default function FieldTextInput({...props}) {
    const[field,meta]=useField(props)
    return (
        <div>
            <FormField style={{margin:"0.5em"}} error={meta.touched && !!meta.error}>
                <Input type="input" {...field}{...props}/>{meta.touched && !!meta.error ?(<label pointing basic color="red" content={meta.error}></label>):null}
            </FormField>  
        </div>
    )
}
