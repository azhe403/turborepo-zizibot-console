import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@zizibot/shadcn/components/ui/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DynamicBreadcrumbs = () => {
  const paths = usePathname();
  const pathNames = paths.split('/').filter(path => path);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbLink asChild>
          <Link href={'/'}>Root</Link>
        </BreadcrumbLink>
        <BreadcrumbSeparator className="hidden md:block" />
        {
          pathNames.map((link, index) => {
            let href = `/${pathNames.slice(0, index + 1).join('/')}`;
            // @ts-ignore
            let itemLink = link[0].toUpperCase() + link.slice(1, link.length);

            return (
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link href={href}>
                    {itemLink}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          })
        }
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumbs;
