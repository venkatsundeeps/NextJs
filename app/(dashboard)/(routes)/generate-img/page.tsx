"use client";

import * as z from "zod";
import { Heading } from "@/components/heading";
import { cn } from "@/lib/utils";
import { Axis3DIcon, Divide, Loader, MessagesSquare } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { amountOptions, imgSchema, resolutionOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormField, FormControl, FormItem } from "@/components/ui/form";
import { Messages } from "openai/resources/beta/threads/index.mjs";
import { useRouter } from "next/navigation";
import { imageOptimizer } from "next/dist/server/image-optimizer";

// --------------------------------
const ImagesGenerate = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof imgSchema>>({
    resolver: zodResolver(imgSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmits = async (values: z.infer<typeof imgSchema>) => {
    // console.log(values);
    try {
      setImages([]);
      const response = await axios.post("/api/imagegenerates", values);
      const urls = response.data.map((images: { url: string }) => images.url);
      setImages(urls);
    } catch (error) {}
  };

  return (
    <>
      <div>
        <Heading
          title="Generate Image"
          // iconColor="Image"
          bgColor="bg-violet-500/10"
          icon={MessagesSquare}
          description="Picture of course in swiss alps"
        />
        <div className="p-4 lg:px-8">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmits)}
                className="rounded-lg border w-full p-4 px-3 md:px-within:shadow-sm grid grid-cols-12 gap-2"
              >
                <FormField
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-6">
                      <FormControl className="m-0 p-0">
                        <input
                          type="text"
                          disabled={isLoading}
                          placeholder="How do I calculate the radious of the Cricle"
                          {...field}
                          className="
                          pl-[10px]
                          focus:outline-none
                          outlinr-none
                          focus-visible:ring-0
                          focus-visible:ring-transperent
                          w-full h-10"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Amount Select Field */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-2">
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {amountOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="Resolutions"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-2">
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {resolutionOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                ></FormField>

                <Button className="col-span-12 lg:col-span-2">Generate</Button>
              </form>
            </Form>
          </div>
        </div>
        <div className=" space-y-4 mt-4">
          {/* //checking is loading/ */}
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center">
              <Loader></Loader>
            </div>
          )}
          {/* if not loading  */}
          {images.length == 0 && !isLoading && <h1>Empty</h1>}
        </div>
      </div>
    </>
  );
};

export default ImagesGenerate;
