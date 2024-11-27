import { Breadcrumb, BreadcrumbItem } from 'flowbite-react';
import { FaHome } from 'react-icons/fa';
type TBreadcrumbItem = {
  title: string;
  url: string;
};
const breadcrumbItems: TBreadcrumbItem[] = [
  {
    title: 'Products',
    url: '/products',
  },
  {
    title: 'Shoes',
    url: '/products/shoes',
  },
  {
    title: 'Running Shoes',
    url: '/products/shoes/running',
  },
];
export const BreadcrumbExample = () => {
  return (
    <Breadcrumb>
      <BreadcrumbItem href='#' icon={FaHome}>
        Home
      </BreadcrumbItem>
      {breadcrumbItems.map((item, index) => (
        <BreadcrumbItem key={index} href={item.url}>
          {item.title}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
