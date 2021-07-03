import React, { ChangeEvent } from "react";

import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../app/model/activity";

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    saveActivity: (activity: Activity) => void;
}

export default function ActivityForm({ activity: selectedActivity, closeForm, saveActivity }: Props) {

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    };

    const [activity, setActivity] = useState(initialState);

    function onFormSubmit_Listener() {
        saveActivity(activity);
    };

    function onFormInputsChange_Listerner(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    return (
        <Segment clearing>
            <Form onSubmit={onFormSubmit_Listener} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={onFormInputsChange_Listerner} ></Form.Input>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={onFormInputsChange_Listerner} ></Form.TextArea>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={onFormInputsChange_Listerner} ></Form.Input>
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={onFormInputsChange_Listerner} ></Form.Input>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={onFormInputsChange_Listerner} ></Form.Input>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={onFormInputsChange_Listerner} ></Form.Input>
                <Button floated='right' positive type='submit' content='Submit'  />
                <Button floated='right' type='button' content='Cancel' onClick={closeForm} />
            </Form>
        </Segment>
    )
}