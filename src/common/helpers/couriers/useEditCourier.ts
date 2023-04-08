import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CouriersService, EditCourierPayload } from "services/CouriersService";
import { Error } from "services/types";
import { useAppSelector } from "store/hooks";
import { EditCourierProfileFormPayload } from "pages/courier/CourierPanel/components/EditCourierProfileForm/types";

import { couriersQueries } from "./couriersQueries";

type Result = {
    onEditCourier: (editPayload: EditCourierProfileFormPayload) => void;
    isLoading: boolean;
    error: string | null;
};

export function useEditCourier(onSuccess?: () => void): Result {
    const { id } = useAppSelector(s => s.auth.authData);
    const client = useQueryClient();

    const { mutate, isLoading, error } = useMutation<void, Error, EditCourierPayload>(
        (editCourierPayload: EditCourierPayload) => CouriersService.editCourier(editCourierPayload),
        {
            onSuccess: () => {
                onSuccess?.();
                client.invalidateQueries(couriersQueries.courier(id!));
            },
        },
    );

    const onEditCourier = (editFormPayload: EditCourierProfileFormPayload) => {
        mutate({
            id: id!,
            payload: editFormPayload,
        });
    }

    return {
        onEditCourier,
        isLoading,
        error: error?.error ?? null,
    };
}