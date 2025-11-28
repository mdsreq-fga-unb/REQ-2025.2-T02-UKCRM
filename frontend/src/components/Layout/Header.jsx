import React from "react";
import { Badge } from "./Badge";
import { Clock } from "./Clock";
import { GrayText } from "./GrayText";
import { Notification } from "./Notification";
import { PropertyGrayWrapper } from "./PropertyGrayWrapper";
import { Search } from "./Search";
import { SunMoon } from "./SunMoon";
import { Text } from "./Text";
import "./style.css";

export const Header = ({
  className,
  propertyGrayWrapperIconTextIconSetIcon = (
    <Search className="icon-instance-node" opacity="0.2" />
  ),
}) => {
  return (
    <div className={`header ${className}`}>
      <div className="path">
        <GrayText
          className="design-component-instance-node-2"
          divClassName="design-component-instance-node-3"
          text="Nome da página anterior ou seção atual"
        />
        <Text
          className="design-component-instance-node-2"
          direction="vertical"
          divClassName="design-component-instance-node-3"
          quantity="one"
          text="/"
        />
        <Text
          className="design-component-instance-node-2"
          direction="vertical"
          quantity="one"
          text="Nome da página atual"
        />
      </div>

      <div className="frame">
        <Notification
          className="design-component-instance-node-2"
          size="big"
          state="failure"
          text="Erro: Mensagem curta do erro"
        />
        <PropertyGrayWrapper
          className="search-3"
          iconTextDirectionVerticalWrapperDirectionVerticalClassName="search-2"
          iconTextDirectionVerticalWrapperText="Pesquisar pelo website"
          iconTextIconSetIcon={propertyGrayWrapperIconTextIconSetIcon}
          iconTextTypeIconTextClassName="search-2"
          property="gray"
        />
        <SunMoon className="sun-moon-instance" tipo="sun" />
        <Clock className="clock-instance" />
        <Badge
          className="badge-instance"
          divClassName="badge-2"
          type="number"
        />
      </div>
    </div>
  );
};
