import { useMemo } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import * as Yup from 'yup';
import { Form, Formik } from "formik";

import { localization } from "resources";

import { dialogStyles } from "common/components/Form/styles";
import { SpicinessType } from "models/domain/SpicinessType";
import { TextField } from "common/components/Form/TextField";
import { Button } from "common/components/Button";
import { useCreateProduct } from "common/helpers/manager/useCreateProduct";
import { ProductType } from "models/domain/ProductType";
import { getStringByProductType } from "models/domain/helpers/getStringByProductType";
import { RadioGroup, RadioOption } from "common/components/Form/RadioGroup";
import { getEnumMembers } from "common/helpers/getEnumMembers";
import { getStringBySpicinessType } from "models/domain/helpers/getStringBySpicinessType";
import { ImagePicker } from "common/components/Form/ImagePicker";

import { ProductFormFields, ProductFormPayload } from "../types";

import styles from '../ProductForm.module.scss';


interface Props {
    isModalOpen: boolean;
    productType: ProductType
    onClose?: () => void;
    onSuccessfulCreate: () => void;
}

const initialValues: Omit<ProductFormPayload, ProductFormFields.Type> = {
    [ProductFormFields.Id]: null,
    [ProductFormFields.Name]: '',
    [ProductFormFields.Description]: '',
    [ProductFormFields.Weight]: '',
    [ProductFormFields.Price]: 0,
    [ProductFormFields.Spiciness]: SpicinessType.NotSpicy,
    [ProductFormFields.Ingredients]: '',
    [ProductFormFields.Image]: '',
};

const formConstraints = {
    nameMaxLength: 50,
    descriptionMaxLength: 200,
    weightMaxLength: 150,
    price: {
        min: 0,
        max: 1000,
    },
    ingredientsMaxLength: 200,
}

const validationSchema = Yup.object({
    [ProductFormFields.Name]: Yup.string().max(
        formConstraints.nameMaxLength,
        localization.nameCanBeMaxLength(formConstraints.nameMaxLength)
    ).required(localization.enterName),
    [ProductFormFields.Description]: Yup.string().max(
        formConstraints.descriptionMaxLength,
        localization.descriptionCanBeMaxLength(formConstraints.descriptionMaxLength)
    ).required(localization.enterDescription),
    [ProductFormFields.Weight]: Yup.string().max(
        formConstraints.weightMaxLength,
        localization.weightCanBeMaxLength(formConstraints.weightMaxLength)
    ).required(localization.enterWeight),
    [ProductFormFields.Price]: Yup.number()
        .moreThan(formConstraints.price.min, localization.priceShouldBeMoreThan(formConstraints.price.min))
        .lessThan(formConstraints.price.max, localization.priceShouldBeLessThan(formConstraints.price.max))
        .required(localization.enterPrice),
    [ProductFormFields.Spiciness]: Yup.mixed<SpicinessType>().oneOf(Object.values(SpicinessType)),
    [ProductFormFields.Ingredients]: Yup.string().max(
        formConstraints.ingredientsMaxLength,
        localization.ingredientsCanBeMaxLength(formConstraints.ingredientsMaxLength)
    ).required(localization.enterPassword),
    [ProductFormFields.Image]: Yup.string().required(localization.pickImage),
});

const spicinessOptions: RadioOption[] = getEnumMembers(SpicinessType).map(t => ({
    option: t,
    label: getStringBySpicinessType(t),
}));

export function CreateProductForm({
    isModalOpen,
    productType,
    onClose,
    onSuccessfulCreate,
}: Props) {
    const { onCreateProduct, isLoading, error } = useCreateProduct(onSuccessfulCreate);

    const formInitialValues = useMemo(() => ({
        ...initialValues,
        [ProductFormFields.Type]: productType,
    }), [productType]);

    return (
        <Dialog
            open={isModalOpen}
            onClose={onClose}
            PaperProps={{
                style: dialogStyles
            }}
            classes={{
                paper: styles['product-form-modal-paper'],
            }}
        >
            <div className={styles['product-form-modal-content']}>
                <DialogTitle
                    fontFamily='inherit'
                    fontSize={24}
                >
                    {localization.addNewProductOfType(getStringByProductType(productType))}
                </DialogTitle>
                <Formik
                    initialValues={formInitialValues}
                    enableReinitialize
                    onSubmit={onCreateProduct}
                    validationSchema={validationSchema}
                >
                    <Form className={styles['product-form']}>
                        <div className={styles['product-form-fields']}>
                            <TextField
                                name={ProductFormFields.Name}
                                placeholder={localization.name}
                            />

                            <TextField
                                inputClassName={styles['product-form-price']}
                                name={ProductFormFields.Price}
                                type='number'
                                placeholder={localization.price}
                            />

                            <TextField
                                name={ProductFormFields.Weight}
                                placeholder={localization.weight}
                            />

                            <RadioGroup
                                label={localization.spiciness}
                                name={ProductFormFields.Spiciness}
                                options={spicinessOptions}
                            />

                            <div className={styles['product-form-fields-wide']}>
                                <TextField
                                    name={ProductFormFields.Description}
                                    placeholder={localization.description}
                                />

                                <TextField
                                    name={ProductFormFields.Ingredients}
                                    placeholder={localization.ingredients}
                                />

                                <ImagePicker
                                    name={ProductFormFields.Image}
                                    className={styles['product-form-image-picker']}
                                />
                            </div>
                        </div>
                        <Button
                            filled
                            isLoading={isLoading}
                            type='submit'
                        >
                            {localization.add}
                        </Button>
                        {error !== null &&
                            (
                                <span className={styles['product-form-error']}>
                                    {error}
                                </span>
                            )}
                    </Form>
                </Formik>
            </div>
        </Dialog>
    )
}