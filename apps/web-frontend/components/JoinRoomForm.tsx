"use client";

import { useActionState } from "react";
import { joinRoom } from "../actions/room/joinRoom";

const initialState = {
    error: "",
};

export default function JoinRoomForm() {
    const [state, formAction] = useActionState(joinRoom, initialState);

    return (
        <form action={formAction} className="space-y-4">
            <div>
                <label
                    htmlFor="room"
                    className="mb-2 block font-semibold"
                >
                    Room Name/ID
                </label>

                <input
                    id="room"
                    name="room"
                    type="text"
                    placeholder="Enter room ID"
                    required
                    className="w-full rounded-lg border p-2"
                />
            </div>

            <button
                type="submit"
                className="w-full rounded-lg bg-green-600 py-2 text-white"
            >
                Join Room
            </button>

            {state.error && (
                <p className="text-red-500">{state.error}</p>
            )}
        </form>
    );
}