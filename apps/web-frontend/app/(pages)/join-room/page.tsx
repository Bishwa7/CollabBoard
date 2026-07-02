import JoinRoomForm from "../../../components/JoinRoomForm";


export default function JoinRoomPage() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow">
                <h1 className="mb-6 text-center text-3xl font-bold">
                    Join Room
                </h1>

                <JoinRoomForm />
            </div>
        </div>
    );
}