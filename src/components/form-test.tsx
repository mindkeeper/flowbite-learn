'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FloatingLabel, Label, Radio, Select } from 'flowbite-react';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { z } from 'zod';
import CustomSelect from './ui/select';
import { useGetInfinitUser } from '@/hooks/use-get-user';
// import dynamic from 'next/dynamic';

// const CustomSelect = dynamic(() => import('./ui/select'), { ssr: false });

const FormSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  status: z.enum(['single', 'married', 'divorced'], { message: 'Please select a marital status' }),
  gender: z.enum(['male', 'female'], { message: 'Please select a gender' }),
  userId: z.string().min(1, { message: 'Please select a user' }),
});

type TFormSchema = z.infer<typeof FormSchema>;

export const FormTest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      status: undefined,
      gender: undefined,
      userId: '',
    },
    mode: 'onBlur',
  });

  const [searchTerm, setSearchTerm] = useState<string>('');

  const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetInfinitUser({ search: searchTerm });

  const userList = useMemo(() => {
    return (
      data?.pages.flatMap((page) =>
        page.users.map((user) => ({
          value: user.id.toString(),
          label: `${user.firstName} ${user.lastName}`,
        }))
      ) ?? []
    );
  }, [data?.pages]);

  const isLoading = useMemo(() => isFetching || isFetchingNextPage, [isFetching, isFetchingNextPage]);
  const fetchMoreData = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  const debouncedSearch = useDebouncedCallback(
    (value: string) => {
      setSearchTerm(value);
    },
    1000,
    { maxWait: 2000 }
  );
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

  const onSubmit = (data: TFormSchema) => {
    console.log(data);
  };
  console.log(watch('userId'));

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

          <CustomSelect
            name='userId'
            control={control}
            options={userList}
            fetchMoreData={fetchMoreData}
            setSearch={debouncedSearch}
            placeholder='Select a user'
            isLoading={isLoading}
            error={!!errors?.userId}
            errorMessage={errors?.userId?.message}
          />

          <Button color='dark' className='self-center w-full' type='submit'>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};
