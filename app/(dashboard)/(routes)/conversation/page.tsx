"use client";
import { Heading } from "@/components/heading";
import { cn } from "@/lib/utils";
import { Axis3DIcon, Divide, Loader, MessagesSquare } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import openai, { OpenAI } from "openai";
import { formSchema } from "./constants";
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
import { z } from "zod";
import ImagesGenerate from "../generate-img/page";
import {
  imgSchema,
  amountOptions,
  resolutionOptions,
} from "../generate-img/constants";
import { env } from "process";

// --------------------------------
const ConversationAi = () => {
  const router = useRouter();
  //   all the server componenet to update
  const [messages, setMessages] = useState<any[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);

    const options = {
      method: "POST",
      url: "https://chatgpt-42.p.rapidapi.com/gpt4",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "0b6e3ae1fdmsh8fd565dcf70d3c4p17929cjsn983ccded10e6",
        "X-RapidAPI-Host": "chatgpt-42.p.rapidapi.com",
      },
      data: {
        messages: [
          {
            role: "user",
            content: values.prompt,
          },
        ],
        tone: "Balanced",
      },
    };

    try {
      // const userMessage = {
      //   role: "user",
      //   content: values.prompt,
      // };
      // const newMessages = [...messages, userMessage];

      const response = await axios.request(options);
      setMessages((current) => [...current, response.data]);
      console.log(response);
    } catch (error: any) {
      //todo open pro model
      console.log(error);
    } finally {
      router.refresh();
    }

    form.reset();
  };

  // const getImage = async () => {
  //   const openai = new OpenAI({
  //     apiKey: "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",
  //     dangerouslyAllowBrowser: true, // This is also the default, can be omitted
  //   });
  //   const completion = await openai.createImage({
  //     model: "dall-e-3",
  //     prompt: "a white siamese cat",
  //     n: 1,
  //     size: "1024x1024",
  //   });
  //   const image_url = completion.data.data[0].url;
  //   console.log(image_url);
  // };

  return (
    <>
      <div>
        <Heading
          title="Conversation"
          // iconColor="Image"
          bgColor="bg-violet-500/10"
          icon={MessagesSquare}
          description="Picture of course in swiss alps"
        />
        <div className="p-4 lg:px-8">
          <div>
            {/* to pass all the functions from constant file */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="rounded-lg border w-full p-4 px-3 md:px-within:shadow-sm grid grid-cols-12 gap-2"
              >
                <FormField
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="m- p-0">
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
                />{" "}
                <Button
                  // onClick={getImage}
                  className=" col-span-12 lg:col-span-2 "
                  disabled={isLoading}
                >
                  Generate
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="space-y-4 mt-4 ml-10">
          <div className="flex flex-col-reverse gap-y-4 font-bold">
            {messages.map((message) => (
              <div key={message.result}>{message.result}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConversationAi;
