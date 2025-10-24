"use client";

import { FC, useState } from 'react';
import { Button } from '@/components/UI/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/UI/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/UI/dialog';
import { Plus, Pencil, Trash2, MapPin, Home, Briefcase } from 'lucide-react';
import { AddressForm } from './AddressForm';
import { Badge } from '@/components/UI/badge';
import { UserData } from '@/app/interface/auth';

interface Address {
  id: string;
  title: string;
  full_address: string;
  postal_code: string;
  city: string;
  country: string;
  is_default: boolean;
  type: 'home' | 'work' | 'other';
}

interface AddressesSectionProps {
  userData: UserData;
}

export const AddressesSection: FC<AddressesSectionProps> = ({ userData }) => {
  // Mock addresses - in a real app, these would come from an API
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      title: 'Домашний адрес',
      full_address: 'ул. Ленина, 12, кв. 45',
      postal_code: '123456',
      city: 'Москва',
      country: 'Россия',
      is_default: true,
      type: 'home'
    },
    {
      id: '2',
      title: 'Рабочий адрес',
      full_address: 'ул. Арбат, 2, офис 302',
      postal_code: '123001',
      city: 'Москва',
      country: 'Россия',
      is_default: false,
      type: 'work'
    },
  ]);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

  const handleAddAddress = () => {
    setCurrentAddress(null);
    setShowAddressForm(true);
  };

  const handleEditAddress = (address: Address) => {
    setCurrentAddress(address);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (addressId: string) => {
    setAddressToDelete(addressId);
    setShowDeleteDialog(true);
  };

  const confirmDeleteAddress = () => {
    if (addressToDelete) {
      setAddresses(addresses.filter(addr => addr.id !== addressToDelete));
    }
    setShowDeleteDialog(false);
    setAddressToDelete(null);
  };

  const handleSetDefault = (addressId: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      is_default: addr.id === addressId
    })));
  };

  const saveAddress = (address: Partial<Address>) => {
    if (currentAddress) {
      // Edit existing address
      setAddresses(
        addresses.map(addr => addr.id === currentAddress.id
          ? { ...addr, ...address }
          : address.is_default ? { ...addr, is_default: false } : addr
        )
      );
    } else {
      // Add new address
      const newAddress = {
        id: Date.now().toString(),
        title: address.title || 'Новый адрес',
        full_address: address.full_address || '',
        postal_code: address.postal_code || '',
        city: address.city || '',
        country: address.country || '',
        is_default: address.is_default || false,
        type: address.type || 'other'
      } as Address;

      // If this is marked as default, update other addresses
      if (newAddress.is_default) {
        setAddresses(
          [...addresses.map(addr => ({ ...addr, is_default: false })), newAddress]
        );
      } else {
        setAddresses([...addresses, newAddress]);
      }
    }

    setShowAddressForm(false);
    setCurrentAddress(null);
  };

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home className="h-5 w-5 text-blue-500" />;
      case 'work':
        return <Briefcase className="h-5 w-5 text-indigo-500" />;
      default:
        return <MapPin className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Мои адреса</h3>
          <p className="mt-1 text-sm text-gray-500">
            Управляйте вашими адресами доставки
          </p>
        </div>
        <Button onClick={handleAddAddress} className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          <span>Добавить адрес</span>
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-10 border border-dashed rounded-lg">
          <MapPin className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Нет сохраненных адресов</h3>
          <p className="mt-1 text-sm text-gray-500">Добавьте ваш первый адрес доставки</p>
          <div className="mt-6">
            <Button onClick={handleAddAddress}>
              <Plus className="h-4 w-4 mr-2" />
              Добавить адрес
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {addresses.map((address) => (
            <Card key={address.id} className="relative">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    {getAddressIcon(address.type)}
                    <CardTitle className="ml-2 text-lg">{address.title}</CardTitle>
                  </div>
                  {address.is_default && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                      По умолчанию
                    </Badge>
                  )}
                </div>
                <CardDescription>{address.full_address}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-700">
                  {address.postal_code}, {address.city}
                </p>
                <p className="text-sm text-gray-700">{address.country}</p>
              </CardContent>
              <CardFooter className="pt-2 flex justify-between">
                {!address.is_default && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Сделать основным
                  </Button>
                )}
                <div className="flex gap-2 ml-auto">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEditAddress(address)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteAddress(address.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {showAddressForm && (
        <Dialog open={showAddressForm} onOpenChange={setShowAddressForm}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {currentAddress ? 'Редактировать адрес' : 'Добавить новый адрес'}
              </DialogTitle>
              <DialogDescription>
                Заполните информацию о вашем адресе
              </DialogDescription>
            </DialogHeader>
            <AddressForm
              address={currentAddress}
              onSave={saveAddress}
              onCancel={() => setShowAddressForm(false)}
              existingAddressCount={addresses.length}
            />
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Удалить адрес</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить этот адрес? Это действие невозможно отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Отменить
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteAddress}
            >
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};