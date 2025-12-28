'use client'

import { useForm } from 'react-hook-form';
import FormField from "@/app/_components/FormField";
import { Input } from "@/components/ui/input";
// import { BeatLoader } from "react-spinners";
import { useRouter } from 'next/navigation'
import useRequest from "@/app/_hooks/use-request";
import { useTranslations } from 'next-intl';
import { useClientAxios } from '../_utils/useClientAxios';
import SubmitButtonContainer from './form_components/SubmitButtonContainer';
import SubmitButton from './form_components/SubmitButton';
import { MdLogin } from 'react-icons/md';

type Inputs = {
    id: string
    password: string
}


const LoginForm = () => {
    const t = useTranslations()
    const { resErrors, doRequest } = useRequest({ onSuccess })
    const axiosInst = useClientAxios()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<Inputs>()

    async function onSubmit(data: Inputs) {
        console.log(data);

        await doRequest(async () => {
            await axiosInst(`https://${process.env.HOST}/api/users/login`, {
                method: 'POST',
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        })

    }

    async function onSuccess() {
        router.replace('/app')
    }

    return (
        <form
            className="w-full mx-auto mt-10 space-y-4"
            onSubmit={handleSubmit(onSubmit)}>

            <FormField
                label={t('id')}
                error={errors.id?.message || resErrors?.id}
            >
                <Input
                    type="text"
                    className="w-full p-2"
                    id="id"
                    {...register('id', { required: t('required') })}
                />
            </FormField>

            <FormField
                label={t('password')}
                error={errors.password?.message || resErrors?.password}
            >
                <Input
                    type="password"
                    className="w-full p-2"
                    id='password'
                    {...register('password', { required: t('required') })}
                />
            </FormField>


            {/**Submit button */}
            <SubmitButtonContainer
                className='md:basis-2/3'
            >
                <SubmitButton
                    disabled={isSubmitting}
                    isSubmitting={isSubmitting}
                    Icon={MdLogin}
                >
                    {t('login')}
                </SubmitButton>
            </SubmitButtonContainer>

        </form >
    )
}

export default LoginForm