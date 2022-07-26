import {useForm} from 'react-hook-form';

const {handleSubmit, register, errors} = useForm();

return <form onSubmit={handleSubmit()}></form>;
