/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useArrayState } from "@cubedoodl/react-simple-scheduler";
import { useState } from "react";

import { Scheduler } from "../lib/main";

import type {
  EventRepetition,
  SchedulerEvent,
  SchedulerProps,
} from "@cubedoodl/react-simple-scheduler";
import type { Meta, StoryObj } from "@storybook/react";

// STORY HELPERS

const CALENDAR = {
  name: "Calendar",
  enabled: true,
};

const EVENTS = [
  {
    from: new Date(new Date().setHours(10, 0)),
    to: new Date(new Date().setHours(13, 0)),
    name: "Coding",
    repeat: EventRepetition.None,
    is_current: true,
    calendar: CALENDAR,
  },
  {
    from: new Date(new Date().setHours(20, 0)),
    to: new Date(new Date().setHours(23, 0)),
    name: "Stargazing",
    repeat: EventRepetition.None,
    is_current: true,
    calendar: CALENDAR,
  },
];

// Higher-order function that returns a function that renders the Scheduler.
// This function accepts a DebugComponent that is rendered below the Scheduler.
const renderSchedulerDemo =
  (DebugComponent?: React.FC<{ addedEvent?: SchedulerEvent; editedEvent?: SchedulerEvent }>) =>
  // eslint-disable-next-line react/display-name
  (args: SchedulerProps) => {
    const { events: initialEvents } = args;
    const [selected, setSelected] = useState(new Date());
    const [events, _setEvents, addEvent] = useArrayState(initialEvents);
    // State for debugging view
    const [addedEvent, setAddedEvent] = useState<SchedulerEvent | undefined>(undefined);
    const [editedEvent, setEditedEvent] = useState<SchedulerEvent | undefined>(undefined);

    return (
      <>
        <Scheduler
          events={events}
          selected={selected}
          setSelected={setSelected}
          editable={args.editable ?? true}
          onRequestAdd={(evt: SchedulerEvent) => {
            setAddedEvent(evt);
            addEvent(evt);
          }}
          onRequestEdit={(evt) => {
            setEditedEvent(evt);
          }}
        />
        {DebugComponent && <DebugComponent addedEvent={addedEvent} editedEvent={editedEvent} />}
      </>
    );
  };

// STORIES

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organisms/Scheduler",
  component: Scheduler,
  render: renderSchedulerDemo(),
  args: {
    events: EVENTS,
    selected: new Date(),
    setSelected: () => {
      //
    },
    onRequestAdd: undefined,
    onRequestEdit: () => {
      //
    },
  },
} satisfies Meta<typeof Scheduler>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * Display initial events on the Scheduler using the `events` prop.
 */
export const DisplayingEvents: Story = {};

/**
 * An empty Scheduler with no events.
 */
export const EmptyScheduler: Story = {
  args: {
    events: [],
  },
};

// Debug view that shows the `SchedulerEvent` object that is passed to the `onRequestAdd` callback.
const DebugAddedEvent = ({ addedEvent }: { addedEvent?: SchedulerEvent }) => {
  return (
    <pre>
      <h3>Added Event:</h3>
      {JSON.stringify(addedEvent, null, 2)}
    </pre>
  );
};

/**
 * Events can be programmatically added to the `Scheduler` using the `setEvents`
 * or `addEvent` function from the `useArrayState` hook
 *
 * The user can also add new events to the Scheduler by clicking and dragging over any empty space
 * on the calendar. When the user releases the mouse, the `onRequestAdd` callback is called
 * with the new `SchedulerEvent` as an argument. Use this callback to do something with the new event
 * (e.g. save it to a database).
 *
 * **NOTE:** The scheduler does not automatically add the event to the calender.
 * You must call the `setEvents` or `addEvent` function from the
 * `useArrayState` hook to actually display the event on the calendar. See
 * [here](https://github.com/Cubified/react-simple-scheduler?tab=readme-ov-file#onrequestadd)
 * for more information.
 *
 * This story includes a debug view that shows what the `SchedulerEvent` object that is
 * passed to the `onRequestAdd` callback. Try adding a new event to the scheduler
 * to see what the `SchedulerEvent` object looks like.
 */
export const AddingEvents: Story = {
  render: renderSchedulerDemo(DebugAddedEvent),
};

// Debug view that shows the `SchedulerEvent` object that is passed to the `onRequestEdit` callback.
const DebugEditedEvent = ({ editedEvent }: { editedEvent?: SchedulerEvent }) => {
  return (
    <pre>
      <h3>Event being edited:</h3>
      {JSON.stringify(editedEvent, null, 2)}
    </pre>
  );
};

/**
 * Events can be edited by clicking on them. When an event is clicked, the `onRequestEdit`
 * callback is called with the `SchedulerEvent` object that was clicked. Use this callback
 * to do something with the event (e.g. open a modal to edit the event).
 *
 * **NOTE:** The scheduler does not automatically edit the event on the calender.
 * You must call the `setEvents` function from the `useArrayState` hook
 * to actually display the updated event on the calendar.
 *
 * This story includes a debug view that shows what the `SchedulerEvent` object that is
 * passed to the `onRequestEdit` callback. Try clicking on an event on the scheduler
 * to see what the `SchedulerEvent` object that gets passed to the `onRequestEdit`
 * callback looks like.
 */
export const EditingEvents: Story = {
  render: renderSchedulerDemo(DebugEditedEvent),
};

/**
 * The `editable` prop can be set to `false` to disable the ability to create new events
 * by clicking and dragging on the calendar.
 *
 * **NOTE:** This does not prevent the user from editing existing events. i.e. clicking
 * on an existing event will still call the `onRequestEdit` callback.
 */
export const DisableEventCreation: Story = {
  args: {
    editable: false,
  },
};
