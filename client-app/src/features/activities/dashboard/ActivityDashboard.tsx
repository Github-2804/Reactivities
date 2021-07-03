import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/model/activity";
import ActivityForm from "../../form/ActivityForm";
import ActivityDetails from "../details/ActivityDetails";
import ActvityList from "./ActivityList";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectedActivityListener: (id: string) => void;
    cancelActivityListener: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    saveActivity: (activity: Activity) => void;
    deleteActivity_Listener: (id: string) => void;
}

export default function ActivityDashboard({ activities, selectedActivity, selectedActivityListener,
    cancelActivityListener, openForm, closeForm, editMode, saveActivity, deleteActivity_Listener }: Props) {
    return (
        <Grid>
            <Grid.Column width="10">
                <ActvityList activities={activities} selectedActivityListener={selectedActivityListener}
                    deleteActivity_Listener={deleteActivity_Listener}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails activity={selectedActivity}
                        cancelActivityListener={cancelActivityListener}
                        openForm={openForm}

                    />}

                {editMode &&
                    <ActivityForm activity={selectedActivity} closeForm={closeForm} saveActivity={saveActivity} />}
            </Grid.Column>
        </Grid>
    )
}