import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';

type TAccodtionContent = {
  title: string;
  content: string;
};

const accordionContent: TAccodtionContent[] = [
  {
    title: 'What is flowbite?',
    content: 'Flowbite is a set of components and utilities that help you build web applications faster.',
  },
  {
    title: 'is there figma file available?',
    content: 'Yes, you can download the figma file from the official website.',
  },
  {
    title: 'What are the differences between flowbite and tailwindcss?',
    content:
      'Flowbite is a set of components and utilities that help you build web applications faster. Tailwindcss is a utility-first css framework for building custom designs.',
  },
];

export const AccordionExample = () => {
  return (
    <div>
      <Accordion className='bg-blue-400 '>
        {accordionContent.map((item, index) => (
          <AccordionPanel key={index}>
            <AccordionTitle>{item.title}</AccordionTitle>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionPanel>
        ))}
      </Accordion>
    </div>
  );
};
