import React from "react";
import { Button, Item, ItemHeader, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/model/activity";

interface Props {
    activities: Activity[];
    selectedActivityListener: (id: string) => void;
    deleteActivity_Listener: (id: string) => void;
}

export default function ActvityList({ activities, selectedActivityListener,deleteActivity_Listener }: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity =>
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue' onClick={() => selectedActivityListener(activity.id)} />
                                <Button floated='right' content='Delete' color='google plus' onClick={() => deleteActivity_Listener(activity.id)} />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )}
            </Item.Group>
        </Segment>
    )
}