import {
  BookOpen,
  Brain,
  Building2,
  HeartHandshake,
  Home,
  Landmark,
  LucideIcon,
  MapPin,
  MessageCircle,
  Shield,
  Sun,
  Users,
  Wallet,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "message-circle": MessageCircle,
  home: Home,
  "book-open": BookOpen,
  users: Users,
  brain: Brain,
  "map-pin": MapPin,
  "heart-handshake": HeartHandshake,
  sun: Sun,
  wallet: Wallet,
  landmark: Landmark,
  "building-2": Building2,
  shield: Shield,
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const Icon = iconMap[icon] ?? Shield;

  return (
    <article className="card-shine group rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-magenta/25 hover:shadow-lg hover:shadow-magenta/10">
      <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-magenta/10 to-burnt-orange/10 p-3 text-magenta transition group-hover:from-magenta group-hover:to-burnt-orange group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="font-serif text-xl font-semibold text-magenta-dark">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </article>
  );
}
