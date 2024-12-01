'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@zizibot/shadcn/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@zizibot/shadcn/components/ui/form';
import { Button } from '@zizibot/shadcn/components/ui/button';
import logDebug from '@zizibot/utils/logger';
import { useCreatePendekin } from '@zizibot/rest-client/internal/pendekin-rest';
import { toast } from 'sonner';

const formSchema = z.object({
  originalUrl: z.string().url(),
  shortPath: z.string()
});

export default function CreatePendekin(props: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {}
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    logDebug('create pendekin', values);
    useCreatePendekin({
      originalUrl: values.originalUrl,
      shortPath: values.shortPath
    }).then(create => {
      toast(create.message);
      props.afterCreatePendekin();
    }).catch(reason => {
      logDebug('error create pendekin', reason);
      toast(reason.response.data.message);
    });
  }

  return (
    <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="originalUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Original Url</FormLabel>
                <FormControl>
                  <Input placeholder="Original URL" {...field} />
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
                  <Input placeholder="Short Path" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
