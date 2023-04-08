import { Rating as MuiRating } from '@mui/lab'


export type RatingProps = {
    value: number;
    readonly?: boolean;
    onChange?: (newValue: number | null) => void;
}

export function Rating({
    value,
    readonly = true,
    onChange,
}: RatingProps) {
    return (
        <MuiRating value={value} readOnly={readonly} onChange={(_, v) => onChange?.(v)} />
    );
}