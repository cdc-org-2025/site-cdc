'use client'
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image';

interface CountryType {
  code: string;
  label: string;
  value: string;
}

const countries: readonly CountryType[] = [
  { code: 'BR', label: 'PT-BR', value: '/pt' },
  { code: 'US', label: 'EN-US', value: '/en' },
];

export default function CountrySelect() {
  const { push } = useRouter()
  const pathname = usePathname()
  const urlPush = splitString(pathname);
  const [language, setLanguage] = useState(urlPush[0]);

  function splitString(input: string) {
    const parts = input.split('/').filter(part => part !== '');
    return [`/${parts[0]}`, `/${parts.slice(1).join('/')}`];
  }

  const handleChangeLanguage = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
    const routerPush = `${event.target.value}${urlPush[1]}`
    push(routerPush)
  };

  return (
    <Select
      id="select-country-lang"
      value={language}
      onChange={handleChangeLanguage}
      size="small"
      sx={{
        width: '116px',
        '& div': {
          display: "flex",
          gap: '10px',
          alignItems: 'center'
        },
        '& img': {
          marginTop: '-2px'
        }
      }}
    >
      {countries.map((option) => (
        <MenuItem
          color='primary'
          id={`option-select-country-${option.label}`}
          value={option.value}
          key={option.code}
          sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Image
            loading="lazy"
            height={14}
            width={20}
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            alt={`Image flag ${option.code}`}
          />
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}
