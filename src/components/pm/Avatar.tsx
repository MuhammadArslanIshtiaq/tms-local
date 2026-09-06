import { avatarClass, initialsOf } from "@/lib/pm/types";

type AvatarProps = {
  id: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  xs: "size-6 text-[0.6rem]",
  sm: "size-7 text-[0.65rem]",
  md: "size-9 text-xs",
  lg: "size-11 text-sm",
};

export const Avatar = ({ id, name, size = "sm", className = "" }: AvatarProps) => (
  <span
    title={name}
    className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ring-1 ${avatarClass(
      id
    )} ${sizes[size]} ${className}`}
  >
    {initialsOf(name)}
  </span>
);

export const AvatarStack = ({
  people,
  max = 4,
}: {
  people: { id: string; name: string }[];
  max?: number;
}) => {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;

  return (
    <div className="flex items-center">
      {shown.map((person) => (
        <Avatar
          key={person.id}
          id={person.id}
          name={person.name}
          size="sm"
          className="-ml-2 ring-2 ring-background first:ml-0"
        />
      ))}
      {extra > 0 ? (
        <span className="-ml-2 inline-flex size-7 items-center justify-center rounded-full bg-surface text-[0.65rem] font-semibold text-slate-gray ring-2 ring-background">
          +{extra}
        </span>
      ) : null}
    </div>
  );
};
