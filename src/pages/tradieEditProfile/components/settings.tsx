import { useEffect, useState } from 'react';
import Switch from '@material-ui/core/Switch';

interface Setting {
  messages: {
    email: boolean,
    pushNotification: boolean,
    smsMessages: boolean,
  },
  reminders: {
    email: boolean,
    pushNotification: boolean,
    smsMessages: boolean,
  },
}

interface Props {
  getSettings: () => void;
  updateSettings: (settings: any, newSettings: any) => void;
  settings: Setting;
}

const Settings = ({ getSettings, updateSettings, settings }: Props) => {
  const [updatedSettings, setUpdatedSettings] = useState<any>({
    messages: { email: true, pushNotification: true, smsMessages: true },
    reminders: { email: true, pushNotification: true, smsMessages: true }
  });

  useEffect(() => {
    getSettings();
  }, [getSettings]);

  useEffect(() => {
    setUpdatedSettings(settings);
  }, [settings]);

  const handleChange = (name: 'email' | 'pushNotification' | 'smsMessages', type: 'messages' | 'reminders') => {
    const settings = { messages: { ...updatedSettings.messages }, reminders: { ...updatedSettings.reminders } };

    settings[type][name] = !settings[type][name];
    updateSettings({
        [type]: {
          [name]: !updatedSettings[type][name]
        },
      },
      settings,
    );
  };

  const { messages = {}, reminders = {} } = updatedSettings;

  return (
    <>
      <div className="flex_row p_settings">
        <div className="flex_col_sm_7">
          <span className="sub_title mb50">Settings</span>
          <div className="form_field">
            <span className="inner_title">Messages</span>
            <span className="info_note">
              Receive messages from users, including messages about new jobs
            </span>
          </div>
          {/* <div className="f_spacebw form_field">
            <span className="form_label">Email</span>
            <div className="toggle_btn">
              <Switch
                checked={messages.email}
                onClick={() => { handleChange('email', 'messages'); }}
                name="email"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
          </div> */}
          <div className="f_spacebw form_field">
            <span className="form_label">Push-notifications</span>
            <div className="toggle_btn">
              <Switch
                checked={messages.pushNotification}
                onClick={() => { handleChange('pushNotification', 'messages'); }}
                name="pushNotification"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
          </div>
          {/* <div className="f_spacebw form_field">
            <span className="form_label">SMS messages</span>
            <div className="toggle_btn">
              <Switch
                checked={messages.smsMessages}
                onClick={() => { handleChange('smsMessages', 'messages'); }}
                name="smsMessages"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
          </div> */}

          <div className="form_field">
            <span className="inner_title">Reminders</span>
            <span className="info_note">
              Receive reminders about new jobs, reviews and others related to
              your activity on the Tickt
            </span>
          </div>
          {/* <div className="f_spacebw form_field">
            <span className="form_label">Email</span>
            <div className="toggle_btn">
              <Switch
                checked={reminders.email}
                onClick={() => { handleChange('email', 'reminders'); }}
                name="email"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
          </div> */}
          <div className="f_spacebw form_field">
            <span className="form_label">Push-notifications</span>
            <div className="toggle_btn">
              <Switch
                checked={reminders.pushNotification}
                onClick={() => { handleChange('pushNotification', 'reminders'); }}
                name="pushNotification"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
          </div>
          {/* <div className="f_spacebw form_field">
            <span className="form_label">SMS messages</span>
            <div className="toggle_btn">
              <Switch
                checked={reminders.smsMessages}
                onClick={() => { handleChange('smsMessages', 'reminders'); }}
                name="smsMessages"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Settings;
