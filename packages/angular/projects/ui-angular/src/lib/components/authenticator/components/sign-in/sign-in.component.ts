import {
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { translate } from '@aws-amplify/ui';

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SignInComponent {
  @HostBinding('attr.data-amplify-authenticator-signin') dataAttr = '';

  // translated phrases
  public forgotPasswordText = translate('Forgot your password? ');
  public signInButtonText = translate('Sign in');

  constructor(public authenticator: AuthenticatorService) {}

  public get context() {
    const { updateForm, toResetPassword, toSignUp, submitForm, error } =
      this.authenticator;
    return { updateForm, toResetPassword, toSignUp, submitForm, error };
  }

  onInput(event: Event) {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.authenticator.updateForm({ name, value });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.authenticator.submitForm();
  }
}