'use client';
import { cn } from '@/lib/utils';
import React, { useCallback, useEffect, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import Select, { InputActionMeta, SingleValue } from 'react-select';
import { DebouncedState } from 'use-debounce';

export interface ICustomSelect<T extends FieldValues, ValueType> {
  label?: string;
  options: { value: ValueType; label: string }[];
  placeholder: string;
  isLoading?: boolean;
  control: Control<T>;
  name: Path<T>;
  setSearch: DebouncedState<(value: string) => void>;
  fetchMoreData: () => void;
  error?: boolean;
  errorMessage?: string;
}

const CustomSelect = <T extends FieldValues, ValueType>({
  label = '',
  options,
  placeholder,
  control,
  name,
  isLoading = false,
  setSearch,
  fetchMoreData,
  error,
  errorMessage,
}: ICustomSelect<T, ValueType>) => {
  const [searchText, setSearchText] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  const handleInputChange = useCallback(
    (value: string, actionMeta: InputActionMeta) => {
      if (value !== searchText && actionMeta.action === 'input-change') {
        setSearchText(value);
        setSearch(value);
      }
    },
    [setSearch, searchText]
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  console.log(searchText);
  return (
    <div>
      {label && <label>{label}</label>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            placeholder={placeholder}
            isSearchable
            isClearable
            isLoading={isLoading}
            onMenuScrollToBottom={fetchMoreData}
            onInputChange={handleInputChange}
            onChange={(selectedOption: SingleValue<{ value: ValueType; label: string }>) => {
              field.onChange(selectedOption?.value);
              if (!selectedOption) setSearch('');
            }}
            value={options.find((option) => option.value === field.value) || null}
            classNames={{
              control(props) {
                return cn({
                  'border border-gray-300 rounded-md': true,
                  'hover:border-gray-400': props.isFocused,
                  'focus-within:border-blue-400': props.isFocused,
                  'border-red-500': error,
                });
              },
              option: () => cn('hover:bg-gray-100 !cursor-pointer'),
            }}
          />
        )}
      />
      {error && <p className='text-red-500 text-sm mt-1.5'>{errorMessage}</p>}
    </div>
  );
};

export default CustomSelect;
