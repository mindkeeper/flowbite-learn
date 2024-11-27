import { Button, ButtonGroup } from 'flowbite-react';
import { HiPaperAirplane } from 'react-icons/hi';

export const ButtonGroupExample = () => {
  return (
    <ButtonGroup>
      <Button color='dark'>Base</Button>
      <Button outline>Outline</Button>
      <Button pill>Pill</Button>
      <Button color='dark' className='flex items-center'>
        <HiPaperAirplane className='size-4 mr-2 mt-0.5 rotate-90' />
        Send
      </Button>
    </ButtonGroup>
  );
};
