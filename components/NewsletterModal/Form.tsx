import { result } from 'lodash';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const H2 = styled.h2`
    margin-top: 0;
    text-align: center;
    font-weight: 500;
    line-height: 1.55;
`;

const P = styled.p`
    text-align: center;
    line-height: 1.55;
    font-weight: 300;
    font-size: 1rem;
    padding: 16px 0;
`;

const Button = styled.button`
    display: block;
    background-color: rgb(31, 141, 214);
    color: #fff;
    width: 100%;
    border: 0;
    padding: 14px 0;
    margin: 0;
    border-radius: 6px;
    font-size: 0.9rem;
    &:hover {
        cursor: pointer;
    }
`;

const ButtonClose = styled(Button)`
    background-color: transparent;
    color: rgb(31, 141, 214);
`;

const Input = styled.input`
    display: block;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 16px;
    padding: 10px 6px;
    font-size: 1rem;
    border: 1px solid #eaeaea;
`;

const DisplayError = styled.div`
    padding: 8px 6px;
    color: rgba(206, 57, 59, 0.9);
    font-size: 0.8rem;
    text-align: center;
`;

interface Props {
    handleClose: () => void;
}

const Form = ({ handleClose }: Props) => {
    const source = 'killedbygoogle';
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);
    const [serverError, setServerError] = useState('');

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        const result = await fetch(
            'https://newsletter.killedbygoogle.com/members/api/send-magic-link/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
        )
            .then(response => {
                if (response.status !== 201) {
                    setServerError('Something went wrong. Try again later.');
                }
                window.localStorage.setItem('kbg-newsletter', 'subscribed');
                return setFormSuccess(true);
            });

        return result;
    };

    if(formSuccess) return <>
        <div>
            <div style={{ width: '80px', 'height': '60px'}}>&nbsp;</div>
        </div>
        <H2>Now check your email!</H2>
        <P>To complete signup, click the confirmation link in your inbox. If it doesn’t arrive within a few minutes, check your spam folder!</P>
        <Button onClick={handleClose}>Close</Button>
    </>;

    return <>
        <H2 style={{marginBottom: 0}}>Subscribe to the<br/>Killed by Google Newsletter</H2>
        <P style={{fontSize: '0.9rem', marginTop: '0', }}>Get exclusive content and curated tech news<br/> and be the first to know about Google's next victim.</P>
        <form onSubmit={handleSubmit(onSubmit)}>

            <input {...register('name', { validate: (val) => val === '' })} type="hidden" />
            <input {...register('requestSrc', { required: true, value: source, validate: (val) => val === source })} type="hidden" />
            <label htmlFor="email">
                <div style={{fontSize: '0.8rem', marginBottom: '8px', fontWeight: 500, }}>Email</div>
                <Input
                    {...register('email', {
                        required: true,
                        pattern: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                    })}
                    type="email"
                    placeholder="knife@killedbygoogle.com"
                />
            </label>

            <Button type="submit">Subscribe</Button>

            <ButtonClose type="button" onClick={handleClose}>No Thanks</ButtonClose>

            <DisplayError>
                {errors.email && <span>An email is required.</span>}
                {errors.name && <span>Sorry, Mr. Robot.</span>}
                {serverError}
            </DisplayError>

        </form>
    </>;
};

export default Form;