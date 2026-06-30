

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    labelClassName?: string;
    inputClassName?: string;
    name?: string;
}

export function LabelledInput({ label, placeholder, type, labelClassName, inputClassName, name }: LabelledInputType) {
    return <div>
        <label className={labelClassName}>{label}</label>
        <input name={name} type={type || "text"} id="first_name" className={inputClassName} placeholder={placeholder} required />
    </div>
}