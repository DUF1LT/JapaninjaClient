import { Form as FormikForm, Formik } from "formik";

import { localization } from "resources";
import { Rating } from "common/components/Rating";

import styles from './FeedbackSection.module.scss';
import { Button } from "common/components/Button";
import { TextInput } from "common/components/TextInput";
import { useRateOrder } from "common/helpers/order/useRateOrder";


export enum FeedbackFormFields {
    Rating = 'rating',
    Feedback = 'feedback',
}

interface Props {
    orderId: string,
    isRated: boolean,
    rating?: number,
    feedback: string,
}

export function FeedbackSection({
    orderId,
    isRated,
    rating,
    feedback,
}: Props) {
    return isRated ? Readonly({ rating, feedback }) : Form(orderId);
}

FeedbackSection.Readonly = Readonly;
FeedbackSection.Form = Form;

function Readonly({
    rating,
    feedback
}: Omit<Props, 'orderId' | 'isRated'>) {
    return (
        <div className={styles['feedback']}>
            {rating && (
                <div className={styles['feedback-item']}>
                    <span className={styles['feedback-item-info']}>{localization.rating}:</span> <Rating value={rating} readonly />
                </div>
            )}
            {feedback && (
                <div className={styles['feedback-item']}>
                    <span className={styles['feedback-item-info']}>{localization.feedback}:</span><span>{feedback}</span>
                </div>
            )}
        </div>
    );
}

const initialValues = {
    [FeedbackFormFields.Rating]: 0,
    [FeedbackFormFields.Feedback]: '',
}

function Form(orderId: string) {
    const { onRateOrder } = useRateOrder(orderId);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={v => onRateOrder(v.rating, v.feedback)}
        >
            {(formikProps) => {
                const { values, setFieldValue } = formikProps;
                const rating = values[FeedbackFormFields.Rating] as number;

                return (
                    <FormikForm className={styles['feedback-form']}>
                        <div className={styles['feedback-form-body']}>
                            <div className={styles['feedback-form-rating']}>
                                <span className={styles['feedback-item-info']}>{localization.rateOrder}:</span>
                                <Rating
                                    value={rating}
                                    readonly={false}
                                    onChange={v => setFieldValue(FeedbackFormFields.Rating, v)}
                                />
                            </div>
                            <TextInput
                                name={FeedbackFormFields.Feedback}
                                placeholder={localization.pleaseLeaveFeedback}
                            />
                            <Button
                                type='submit'
                            >
                                {localization.rate}
                            </Button>
                        </div>
                    </FormikForm>
                );
            }}
        </Formik>
    );
}