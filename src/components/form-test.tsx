'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FloatingLabel, Label, Radio, Select } from 'flowbite-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  status: z.enum(['single', 'married', 'divorced'], { message: 'Please select a marital status' }),
  gender: z.enum(['male', 'female'], { message: 'Please select a gender' }),
});

type TFormSchema = z.infer<typeof FormSchema>;

export const FormTest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      status: undefined,
      gender: undefined,
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: TFormSchema) => {
    console.log(data);
  };
  const selectOptions = useMemo(
    () => [
      {
        value: 'single',
        label: 'Single',
      },
      {
        value: 'married',
        label: 'Married',
      },
      {
        value: 'divorced',
        label: 'Divorced',
      },
    ],
    []
  );

  console.log(errors);
  return (
    <div className='max-w-3xl w-full bg-neutral-100 text-slate-800 flex flex-col rounded-lg'>
      <div className='flex flex-col gap-y-2 p-4'>
        <h1 className='font-semibold text-3xl/6'>Personal Data Form</h1>
        <h3 className='font-semibold text-lg/6 text-slate-400'>
          Please fill out the form below to complete your registration.
        </h3>
      </div>

      {/* Form input sections */}
      <div className='flex flex-col gap-4 p-4'>
        <form className='flex flex-col space-y-5' onSubmit={handleSubmit(onSubmit)}>
          <FloatingLabel
            label='First Name'
            variant='outlined'
            {...register('firstName')}
            color={errors.firstName ? 'error' : 'default'}
            helperText={errors.firstName?.message}
          />
          <FloatingLabel
            label='Last Name'
            variant='outlined'
            {...register('lastName')}
            color={errors.lastName ? 'error' : 'default'}
            helperText={errors.lastName?.message}
          />

          <Select
            {...register('status')}
            defaultValue={undefined}
            aria-placeholder='Select martial status'
            helperText={errors.status?.message}
            color={errors.status ? 'failure' : 'default'}
          >
            <option value={undefined}>Choose martial status</option>
            {selectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <fieldset>
            <legend className='text-slate-500 text-base mb-2.5'>Choose your gender</legend>
            <div className='flex gap-x-4'>
              <div className='flex items-center gap-x-2'>
                <Radio value='male' id='male' />
                <Label htmlFor='male'>Male</Label>
              </div>
              <div className='flex items-center gap-x-2'>
                <Radio value='female' id='female' {...register('gender')} />
                <Label htmlFor='female'>Female</Label>
              </div>
            </div>
            {errors.gender && <p className='text-red-500 text-sm mt-1.5'>{errors.gender.message}</p>}
          </fieldset>

          <Button color='dark' className='self-center w-full' type='submit'>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};
