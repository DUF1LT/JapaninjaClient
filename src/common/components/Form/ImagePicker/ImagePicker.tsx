import React, { useCallback, useState } from "react";
import classNames from "classnames";
import { ErrorMessage, useFormikContext } from "formik";

import { ProductFormPayload } from "pages/manager/ManagerMenu/components/ProductForms/types";
import { localization } from "resources";

import styles from './ImagePicker.module.scss';
import formStyles from '../Form.module.scss';

interface Props {
    className?: string;
    name: string;
    onImageChange?: (image: string) => void;
}

export function ImagePicker({
    className,
    name,
    onImageChange
}: Props) {
    const { values, setFieldValue } = useFormikContext<ProductFormPayload>()
    const imageValue = values.image;

    const [image, setImage] = useState(imageValue ?? '');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleCreateBase64 = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        const base64 = await convertToBase64(file);

        setImage(base64);
        setFieldValue(name, base64)

        e.target.value = '';
    }, [name, setFieldValue]);

    const convertToBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result as string);
            }
            fileReader.onerror = (e) => {
                reject(e);
            }
        });
    };

    return (
        <div className={classNames(styles['image-picker-container'], className)}>
            <div className={styles['image-picker']}>
                {image && (
                    <img className={styles['image-picker-image']} src={image} alt='' />
                )}
                <span
                    className={styles['image-picker-input-label']}
                    onClick={() => inputRef.current!.click()}
                >
                    <input
                        ref={inputRef}
                        className={styles['image-picker-input']}
                        type='file'
                        accept='image/*, png, jpeg, jpg'
                        onChange={handleCreateBase64}
                    />
                    {localization.addImage}
                </span>
            </div>
            <div className={formStyles['form-field-error']}>
                <ErrorMessage name={name} />
            </div>
        </div>
    );
}