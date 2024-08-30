import { cn } from "@/utils/cn";
import AnimatedShinyText from "../UI/ShinyText";
import TextArea from "antd/es/input/TextArea";
import { IconDelete, IconUpdate } from "../icons";
import { IDescription } from "@/context/DescriptionContext";
import { TextGenerateEffect } from "../UI/GenerateEffect";

interface ParamsDescriptionsProps {
  description: IDescription[];
  deleteDesc: (descriptionId: string) => void;
  updateSubmit: (e: any) => void;
  update: (desc: any) => void;
  submit: (e: any) => void;
  isUpdateOpen: boolean;
  isAddOpen: boolean;
  descId: string | null;
  openAddDesc: () => void;
}

export const ParamsDescriptions: React.FC<ParamsDescriptionsProps> = ({
  description,
  deleteDesc,
  updateSubmit,
  update,
  submit,
  isUpdateOpen,
  isAddOpen,
  openAddDesc,
  descId,
}) => {
  return (
    <div className="space-y-12 pt-12">
      <h2 className="text-4xl tracking-wider max-[400px]:text-2xl text-center mb-8">
        Vos descriptions
      </h2>
      <div className="space-y-4">
        {description.map((desc: any, index: number) => {
          return (
            <div
              key={desc.id || index} // Assurez-vous que chaque description a un identifiant unique
              className="bg-gray-50 shadow-xl shadow-black/10 py-5 px-8 max-[400px]:px-4 max-[400px]:py-4 rounded-3xl space-y-4"
            >
              <h3 className="text-xl max-[400px]:text-lg font-semibold text-center">
                {index + 1}
              </h3>
              {isUpdateOpen && descId === desc._id ? (
                <form onSubmit={updateSubmit}>
                  <TextArea
                    showCount
                    maxLength={280}
                    id="description"
                    name="description"
                    placeholder="disable resize"
                    style={{
                      height: 130,
                      resize: "none",
                      borderColor: "#00000060",
                      scrollbarWidth: "none",
                    }}
                    defaultValue={desc.description}
                    className="tracking-wider max-[400px]:text-sm leading-relaxed"
                  />
                  <div className="flex items-center justify-end mt-12">
                    <div
                      className={cn(
                        "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                      )}
                    >
                      <AnimatedShinyText className="text-xl px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                        <button type="submit">Sauvegarder</button>
                      </AnimatedShinyText>
                    </div>
                  </div>
                </form>
              ) : (
                <div>
                  <p className="tracking-wider leading-relaxed max-[400px]:text-sm">
                    {desc.description}
                  </p>
                  <div className="flex items-center justify-end mt-8 gap-8">
                    <div
                      className="h-7 w-7 text-black/80 hover:scale-105 ease-in-out duration-300 cursor-pointer"
                      onClick={() => update(desc)}
                    >
                      <IconUpdate />
                    </div>
                    <div
                      className="h-7 w-7 text-black/80 hover:scale-105 ease-in-out duration-300 cursor-pointer"
                      onClick={() => deleteDesc(desc._id)}
                    >
                      <IconDelete />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {description.length > 10 ? (
        <form onSubmit={submit}>
          {isAddOpen && (
            <TextArea
              showCount
              maxLength={280}
              id="description"
              name="description"
              placeholder="Votre description"
              style={{
                height: 160,
                resize: "none",
                borderColor: "#00000060",
                scrollbarWidth: "none",
              }}
              className="text-lg max-[400px]:text-sm"
            />
          )}
          <div className="flex items-center justify-center">
            {isAddOpen ? (
              <div
                className={cn(
                  "group mt-10 rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                )}
              >
                <AnimatedShinyText className="text-xl px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <button type="submit">Créer</button>
                </AnimatedShinyText>
              </div>
            ) : (
              <div
                className={cn(
                  "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                )}
              >
                <AnimatedShinyText className="text-xl px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <p onClick={openAddDesc}>Ajoutez en une</p>
                </AnimatedShinyText>
              </div>
            )}
          </div>
        </form>
      ) : (
        <TextGenerateEffect
          words={
            "🎉 Dans LovniaGame, deux photos apparaissent au hasard ! Choisissez celle que vous préférez et découvrez quelle est votre photo coup de cœur ! 📸💕"
          }
          delay={0.1}
          className="text-[#000000c4] text-xl px-4 text-center tracking-wider leading-relaxed"
        />
      )}
    </div>
  );
};
