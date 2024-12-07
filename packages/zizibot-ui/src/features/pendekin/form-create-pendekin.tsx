'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePendekin } from '@zizibot/rest-client/internal/pendekin-rest';
import { Button } from '@zizibot/shadcn/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@zizibot/shadcn/components/ui/form';
import { Input } from '@zizibot/shadcn/components/ui/input';
import { logDebug } from '@zizibot/utils/logger';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  originalUrl: z.string().url('Please input valid URL'),
  shortPath: z.string().optional()
});

export default function FormCreatePendekin(props: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {}
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    logDebug('create pendekin', values);
    useCreatePendekin({
      originalUrl: values.originalUrl,
      shortPath: values.shortPath
    }).then(({ message }) => {
      toast(message);
      props.afterCreatePendekin();
    }).catch(reason => {
      logDebug('error create pendekin', reason);
      toast(reason.response.data.message);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="originalUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Original Url</FormLabel>
              <FormControl>
                <Input placeholder="Enter Original Url want to get Pendekin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortPath"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Path</FormLabel>
              <FormControl>
                <Input placeholder="Enter Short Path for Original URL routing" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className={'py-2'}>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
